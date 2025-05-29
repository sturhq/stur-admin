import React from 'react';
import {ArrowLeft} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import DetailedStore from './DetailedStore';

const CreateStorePage = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div>
        <div className="flex items-center gap-5 mb-6 py-[1.25rem] px-[1.875rem] max-lg:px-[0.625rem] max-lg:py-[0.9375rem]  border-b">
          <div className="border rounded-xl p-2">
            <ArrowLeft
              onClick={() => navigate(-1)}
              className=" cursor-pointer"
            />
          </div>
          <h1 className="text-2xl font-bold max-lg:text-lg">
            Create stores
          </h1>
        </div>

        <div className="mx-auto w-full">
          <DetailedStore />
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateStorePage;
