export default function Loading() {
  return (
    <div className="container flex-1 flex items-center justify-center">
      <div>
        <div className="inline-block">
          <h2 className="text-sm leading-8">Loading...</h2>
          <div className="progress w-1 h-[3px] bg-foreground rounded-full animate-[progress_2s_ease_infinite]"></div>
        </div>
      </div>
    </div>
  );
}
