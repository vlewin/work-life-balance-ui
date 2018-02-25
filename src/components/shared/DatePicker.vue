<template>
  <ul>
    <li class="arrow" v-on:click="prevWeek">
      &laquo;
    </li>
    <li class="uppercase" v-for="(item, index) in dates" :key="index" :data-hours="item.duration" :class="addClasses(item)" v-on:click="selectDay(item.date)">
      {{ item.weekday }}
    </li>
    <li class="arrow" v-on:click="nextWeek">
      &raquo;
    </li>
  </ul>
</template>

<script>
// FIXME: replace with date-fns
import addHours from "date-fns/add_hours"
import holiday from "german-holiday"
import { weekNumber, weekStartDay, weekDaysRange } from "../../helpers/date"
import { mapGetters, mapState } from "vuex"

export default {
  name: "DatePicker",
  data() {
    return {
      current: weekNumber(),
      year: new Date().getFullYear(),
      week: [],
      weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    }
  },

  created: async function() {
    this.week = weekDaysRange(this.selected)
    await this.$store.dispatch("fetchRecords")
  },

  computed: {
    ...mapGetters(["currentWeekNumber", "currentFomatedDate", "currentRecord"]),
    ...mapState(["currentDate", "records"]),
    dates() {
      return weekDaysRange(this.selected).map(date => {
        console.log(date)
        let record = this.records[date.toLocaleDateString()] || {}
        return {
          date: date,
          weekday: this.weekdays[date.getDay()],
          duration: record.duration,
          selected: this.isSelected(date),
          weekend: this.isWeekend(date),
          recorded: !!record.date
        }
      })
      // return Object.keys(this.records).map(key => {
      //   let record = this.records[key];
      //   return this.records[key];
      // });
    },

    selected() {
      return this.$store.state.currentDate
    }
  },

  methods: {
    addClasses(date) {
      return {
        selected: date.selected,
        weekend: date.weekend,
        holiday: date.holiday,
        recorded: date.recorded,
        positive: date.duration >= 8
      }
    },

    isSelected(date) {
      return this.currentDate.toLocaleDateString() === date.toLocaleDateString()
    },

    isWeekend(date) {
      return date.getDay() == 6 || date.getDay() == 0
    },

    isHoliday(date) {
      // TODO: State from settings page
      return holiday.holidayCheck(date, "BY")
    },

    isRecorded(date) {
      return !!this.records[date.toLocaleDateString()]
    },

    isPositive(date) {
      const record = this.records[date.toLocaleDateString()]
      return record ? record.duration >= 8 : null
    },

    selectDay(date) {
      this.$store.dispatch("setCurrentDate", addHours(date, 1))
    },

    hours(date) {
      const record = this.records[date.toLocaleDateString()]
      return record ? record.duration : null
    },

    // FIXME: Use date-fns
    prevWeek() {
      if (this.current > 0) {
        this.current = this.current - 1
      } else {
        this.current = 52
        this.year -= 1
      }

      this.week = weekDaysRange(weekStartDay(this.current, this.year))
      this.$store.dispatch("setCurrentDate", addHours(this.week[0], 1))
      this.$store.dispatch("fetchRecords", this.current)
      this.$emit("prevWeek")
    },

    // FIXME: Use date-fns
    nextWeek() {
      if (this.current === 52) {
        this.current = 0
        this.year += 1
      } else {
        this.current = this.current + 1
      }

      this.week = weekDaysRange(weekStartDay(this.current, this.year))
      this.$store.dispatch("setCurrentDate", addHours(this.week[0], 1))
      this.$store.dispatch("fetchRecords", this.current)
      this.$emit("nextWeek")
    }
  }
}
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;

  background: #004a9f;
  color: #fff;
  padding: 0 0.2rem;
}

li {
  cursor: pointer;
  list-style: none;
  width: 2.2rem;
  height: 2.2rem;
  line-height: 2.4rem;
  border-radius: 50%;
  transition: color 0.2s, background 1s;
  border: 0.1rem solid #004a9f;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  position: relative;
}

.arrow {
  background: rgba(0, 0, 0, 0.1);
  font-size: 1.4rem;
  line-height: 2rem;
}

.selected {
  background: #fff;
  color: #004a9f;
}

.weekend {
  /*background: rgba(0,0,0,0.3);*/
  color: #607d8d;
  pointer-events: none;
}

.holiday {
  background: tomato;
  color: #fff;
  pointer-events: none;
}

.recorded::after {
  content: attr(data-hours);
  font-size: 0.1rem;
  display: block;
  position: absolute;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  border-radius: 100%;
  top: -0.1rem;
  right: -0.4rem;
  border: 1px solid #004a9f;
  background: tomato;
  color: white;
  z-index: 1;
}

.recorded.positive::after {
  background: #42b983;
}
</style>
