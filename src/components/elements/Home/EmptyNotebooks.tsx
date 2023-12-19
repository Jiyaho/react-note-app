import { ImBooks } from 'react-icons/im';

interface Prop {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function EmptyNotebooks({ onClick }: Prop) {
  return (
    <section className="flex flex-col justify-center items-center w-full h-40 mt-[31vh]">
      <div className="w-min p-3.5 rounded-full bg-gray-100 text-gray-400">
        <ImBooks className="text-5xl" />
      </div>
      <p className="mt-4 text-sm text-gray-500">
        You can organize notes of the same topic into notebooks.
      </p>
      <button onClick={onClick} className="mt-3 text-sm text-sky-600">
        Create New Notebook
      </button>
    </section>
  );
}

export default EmptyNotebooks;
