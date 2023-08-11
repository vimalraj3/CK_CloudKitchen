interface DividerProps {
  size?: string;
  color?: string;
  margin?: string;
}
export const Divider: React.FC<DividerProps> = ({ size, color, margin }) => {
  const props: DividerProps = {
    size: size || `2px`,
    color: color || `#000`,
    margin: margin || `1rem`,
  };
  return (
    <div
      className={`w-[100%]`}
      style={{
        height: props.size,
        backgroundColor: props.color,
        margin: `${props.margin} 0  0 0`,
      }}
    />
  );
};
