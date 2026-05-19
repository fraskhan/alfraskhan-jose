export default function Ruler() {
  const ticks = Array.from({ length: 41 }, (_, i) => i);

  return (
    <div className="relative h-6 border-b border-divider bg-paper select-none">
      <div className="absolute inset-x-0 top-0 flex justify-between px-6">
        {ticks.map((i) => (
          <div
            key={i}
            className="flex flex-col items-center"
            style={{ width: i % 5 === 0 ? "2px" : "1px" }}
          >
            <div
              className="bg-ruler"
              style={{
                width: "1px",
                height: i % 10 === 0 ? "10px" : i % 5 === 0 ? "7px" : "4px",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
