import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../redux/api/usersApi'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [login, {isLoading}] = useLoginMutation();
    const navigate = useNavigate();



    const submitHandler = async(e) => {
        e.preventDefault()
        setEmailError('')
        setPasswordError('')
        
        let isValid = true
        
        if (!email) {
            setEmailError('Please enter your email')
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email')
            isValid = false
        }
        
        if (!password) {
            setPasswordError('Please enter your password')
            isValid = false
        }
        
        if (isValid) {
            // Handle login logic here
            try {
                await login({ email, password }).unwrap();
                navigate('/');
                toast.success("User logged in.");
            } catch (err) {
                toast.error(err.message || err.data.message || "An error occurred during login.");
            }
        }
    }

    return (
        <div className="mx-auto my-[9%] px-10 py-3 rounded-[1.5rem] bg-slate-800 shadow-2xl h-[350px] w-[350px]">
            <h1 className="text-[35px] font-semibold mb-4 mt-3">Login</h1>
            <form onSubmit={submitHandler} noValidate>
                <div className="relative">
                    <input
                        className={`bg-transparent border-b-2 rounded-[0.5rem] px-3 py-2 w-full focus:outline-none focus:border-sky-500 ${emailError ? 'border-red-500' : 'border-slate-600'}`}
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="text-red-500 text-sm mt-1 absolute">{emailError}</p>}
                </div>
                <div className="relative mt-4">
                    <input
                        className={`bg-transparent border-b-2 rounded-[0.5rem] px-3 py-2 w-full focus:outline-none focus:border-sky-500 ${passwordError ? 'border-red-500' : 'border-slate-600'}`}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <p className="text-red-500 text-sm mt-1 absolute">{passwordError}</p>}
                </div>
                <button disabled={isLoading} className="bg-red-500 w-full rounded p-2 mt-8" type="submit">Login to your account</button>
            </form>
            <div className='mt-6 text-center'>
                <span>{`Don't have an account? `}<Link to={'/auth/register'} className='text-red-500'>Sign Up</Link></span>
            </div>
        </div>
    )
}

export default Login
