import {useNavigate} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';
import DetailedStore from './DetailedStore';

const EditStorePage = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-28">
      <div className="flex items-center gap-5 mb-6 py-[1.25rem] px-[1.875rem] max-lg:px-[0.625rem] max-lg:py-[0.9375rem]  border-b">
        <div className="border rounded-xl p-2">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className=" cursor-pointer"
          />
        </div>
        <h1 className="text-2xl font-bold max-lg:text-lg">
          Edit store info
        </h1>
      </div>
      <div className="mx-auto max-w-5xl">
        <DetailedStore />
      </div>
    </div>
  );
};

export default EditStorePage;
