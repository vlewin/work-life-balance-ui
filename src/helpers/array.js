Array.range = (start, end) => [...Array((end - start) + 1)].map((_, i) => (start + i).toString().padStart(2, '0'))
