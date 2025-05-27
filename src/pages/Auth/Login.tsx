import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import React from 'react';
import {z} from 'zod';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useLoginEndpoint} from '@/services/authentication.service';
import {useNavigate} from 'react-router-dom';
import {useGetUser} from '@/services/user.service';

const schema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});

type FormValues = {
  email: string;
  password: string;
};

const defaultValues: FormValues = {
  email: '',
  password: '',
};

const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onSubmit',
  });

  const userId = localStorage.getItem('userId');
  const {mutateAsync, isPending} = useLoginEndpoint();
  useGetUser(userId);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      await mutateAsync({
        username: data.email,
        password: data.password,
      }).then(res => {
        if (res) {
          if (res?.data?.data?.user?.tier === 'personal') {
            if (res?.data?.data?.user?.verification?.status) {
              navigate('/');
            } else {
              navigate('/stores');
            }
          } else {
            if (res?.data?.data?.user?.verification?.cac.isVerified) {
              navigate('/');
            } else {
              navigate('/stores');
            }
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <form
        className="flex flex-col max-lg:mt-6  w-full max-lg:h-screen"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1 mb-[2.5rem]">
          <img
            src="/stur.svg"
            alt="logo"
            className="w-[4rem] h-[4rem] hidden lg:mx-auto max-lg:block max-lg:mb-6"
          />
          <h1 className="text-[1.75rem] font-sf-display font-bold leading-9 sf-pro-display tracking-[0.34px]">
            Sign in
          </h1>
          <p className="text-sm font-normal leading-5">
            Sign in to continue to your Dashboard
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <Controller
            name="email"
            control={control}
            render={({field}) => (
              <Input
                label="Email"
                type="email"
                {...field}
                error={!!errors.email}
                errorMessage={errors.email?.message}
                placeholder="Enter your email address"
                data-cy="login-email-input"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({field}) => (
              <Input
                label="Password"
                type="password"
                {...field}
                error={!!errors.password}
                errorMessage={errors.password?.message}
                placeholder="Enter your password"
                data-cy="login-password-input"
              />
            )}
          />

          <Button data-cy="login-button" type="submit" loading={isPending}>
            Sign in
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Login;
