const Skeleton = ({ className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={[
        "animate-pulse rounded-md bg-white/10",
        className,
      ].join(" ")}
    />
  );
};

export default Skeleton;

