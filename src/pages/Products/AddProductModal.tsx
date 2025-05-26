// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogClose,
// } from '@/components/ui/dialog';
// import {Button} from '@/components/ui/button';
// import {useState} from 'react';
// import {useNavigate} from 'react-router-dom';
// import {Instagram} from 'lucide-react';
// import clsx from 'clsx';
// import {CubeIcon} from '@heroicons/react/24/solid';
// // import {gaRecordEvent} from '@/analytics';

// const options = [
//   {
//     key: 'manual',
//     title: 'Add Manually',
//     description:
//       'Manually provide your product information and start selling',
//     icon: <CubeIcon className="w-6 h-6 text-white" />,
//     bg: 'bg-[#5433EB]',
//   },
//   {
//     key: 'instagram',
//     title: 'Import from Instagram',
//     description: 'Automatically import products from your Instagram posts',
//     icon: <Instagram className="w-6 h-6 text-white" />,
//     bg: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600',
//   },
// ];

// export default function AddProductModal({
//   open,
//   onOpenChange,
// }: {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }) {
//   const [selected, setSelected] = useState<'manual' | 'instagram' | null>(
//     'manual'
//   );
//   const navigate = useNavigate();

//   const handleProceed = () => {
//     if (selected === 'manual') {
//       navigate('/products/add-product');
//     } else if (selected === 'instagram') {
//       alert('Instagram import coming soon!');
//     }
//     gaRecordEvent('ADD_PRODUCT', 'user proceeds to add product page');
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="rounded-2xl max-lg:rounded-[1.25rem]">
//         <DialogHeader className="max-lg:text-start !max-lg:space-y-0 h-full">
//           <DialogTitle className="max-lg:flex max-lg:justify-start max-lg:flex-col">
//             <p className=" font-bold"> Add Products</p>
//             <p className="text-[#6A7383] font-normal  max-lg:mb-0 max-lg:mt-0 hidden max-lg:block">
//               How would you like to add products?
//             </p>
//           </DialogTitle>
//         </DialogHeader>

//         <p className="text-muted-foreground mb-4 max-lg:hidden block">
//           How would you like to add products?
//         </p>
//         <div className=" flex flex-col gap-[2.25rem] max-lg:gap-[0.75rem] max-lg:mb-96">
//           <div className="grid grid-cols-2 gap-4 max-lg:flex max-lg:flex-col">
//             {options.map(option => (
//               <div
//                 key={option.key}
//                 onClick={() =>
//                   option.key !== 'instagram' &&
//                   setSelected(option.key as 'manual' | 'instagram')
//                 }
//                 className={clsx(
//                   'p-4 border rounded-[0.9375rem] transition-all',
//                   selected === option.key
//                     ? 'border-[#5433EB] border-[2px]'
//                     : 'border-muted',
//                   option.key === 'instagram'
//                     ? 'opacity-60 cursor-not-allowed'
//                     : 'cursor-pointer'
//                 )}
//               >
//                 <div
//                   className={clsx(
//                     'w-10 h-10 rounded-full flex items-center justify-center mb-2 ',
//                     option.bg
//                   )}
//                 >
//                   {option.icon}
//                 </div>
//                 <div className="pr-[1.5625rem] max-lg:pr-[5.75rem]">
//                   {' '}
//                   <h4 className="font-medium text-sm mb-1">
//                     {option.title}
//                   </h4>
//                   <p className="text-xs text-muted-foreground">
//                     {option.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <Button className="w-full max-lg:mt-0" onClick={handleProceed}>
//             Proceed
//           </Button>
//         </div>
//         <DialogClose asChild>
//           <button className="absolute top-4 right-4 text-muted-foreground hover:text-primary">
//             ✕
//           </button>
//         </DialogClose>
//       </DialogContent>
//     </Dialog>
//   );
// }
