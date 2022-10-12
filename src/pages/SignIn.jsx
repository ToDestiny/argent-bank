import '../App.css';
import argentBankLogo from '../assets/img/argentBankLogo.png';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../features/login/loginSlice';
import { selectLogin } from '../utils/selectors';

function SignIn() {
  const dispatch = useDispatch();

  const login = useSelector(selectLogin);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      password: '',
    },
  });

  console.log(errors);

  return (
    <div>
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="/sign-in">
            <i className="fa fa-user-circle" />
            Sign In
          </a>
        </div>
      </nav>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon" />
          <h1>Sign In</h1>
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(fetchLogin);
              console.log(login.status);
            })}
          >
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                {...register('firstName', { required: 'This is required.' })}
              />
              {errors.firstName?.message && <span>This is required.</span>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register('password', {
                  required: 'This is required.',
                  minLength: {
                    value: 4,

                    message: 'Min length is 4',
                  },
                })}
              />
              {errors.password?.message && <span>This is required.</span>}
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <input class="sign-in-button" type="submit" value="Sign In" />
          </form>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}

export default SignIn;
