import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';

interface Prop {
  isOpenList: boolean;
  onClick?: React.MouseEventHandler;
}
function ArrowRotate({ isOpenList, onClick }: Prop) {
  return (
    <>
      {isOpenList ? (
        <button onClick={onClick} className="text-gray-400 hover:text-gray-700">
          <IoIosArrowDown />
        </button>
      ) : (
        <button onClick={onClick} className="text-gray-400 hover:text-gray-700">
          <IoIosArrowForward />
        </button>
      )}
    </>
  );
}
export default ArrowRotate;
