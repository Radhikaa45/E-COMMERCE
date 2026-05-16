export default function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-[#E7DDD2] border-t-[#9E1D2F]"
      style={{ width: size, height: size }}
    />
  );
}
