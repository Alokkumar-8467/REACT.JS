import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

const Youtubeform = () => {
  const form = useForm({
    defaultValues:{
      username:"alok",
      email:"alok@kola",
      channel: "kola"
    }
  });
  const { register, control, handleSubmit,formState:{errors}} = form;
  
  const onSubmit = (data ) => {
    console.log("form submitted", data);
  };

  renderCount++;

  return (
    <div>
      <h1>YouTube Form ({renderCount}) </h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className=' flex justify-center bg-slate-100 mt-20 mr-96 ml-96 shadow-2xl '>
        <div>
          <div className='mt-2'>
            <label htmlFor='username'>Username</label><br/>
            <input className='border border-gray-700 mt-1 mb-2 rounded-md' type='text' id='username' {...register("username",{
              required:{
                value:true,
                message:"Username is required"
              }
            })} />
            <p className='text-red-800'>{errors.username?.message}</p>
          </div>
          <div>
            <label htmlFor='email'>Email</label><br/>
            <input className='border border-gray-700 mt-1 mb-2 rounded-md' type='email' id='email'  {...register("email",{
              required:{
                value: true,
                message: "Invalid email format",
              },

              // we can write it as a function or an object also. 
              // validate:(fieldValue) => {
              //   return (
              //     fieldValue !== "admin@gmail.com" ||
              //     "Enter a different email address It is Restricted"
              //   );
              // },
              validate:{
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@gmail.com" ||
                   "Enter a different email address. It is Restricted"
                  )
                },
                notBlackListed: (fieldValue) => {
                  return (
                   !fieldValue.endsWith("yahoo.com") ||
                  "This domain is not supported "
                  )
                }
              }
            })} />
            <p className='text-red-800'>{errors.email?.message}</p>
          </div>
          <div>
            <label htmlFor='channel'>Channel</label><br/>
            <input className='border border-gray-700 mt-1 mb-2 rounded-md' type='text' id='channel'  {...register("channel",{
                required:{
                  value:true,
                  message:"Channel name is required"
                }
            })} />
            <p className='text-red-800'>{errors.channel?.message}</p>
          </div>
          <div className='rounded-md bg-blue-700 mb-4'>
            <button>Submit</button>
          </div>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default Youtubeform;

