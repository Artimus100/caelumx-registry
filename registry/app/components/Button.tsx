
interface ButtonProps {
  label ?: string;
  color ?: string;
  width ?: string;
  cancel ?: Boolean
  onClick ?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps> = ({
  label = "Click Me",
  color , // Default color: Green
  width = "150px",  // Default width
  onClick,
  cancel = false
}) => {
  return (
    <button onClick={onClick} className={` ${cancel ?  ' text-zinc-300 border-[1.5px] border-zinc-500' : 'bg-teal-600  text-zinc-200'}  px-4 py-[10px] shadow-md font-medium  rounded-md text-sm   `}>
      {label}
    </button>
  );
};
