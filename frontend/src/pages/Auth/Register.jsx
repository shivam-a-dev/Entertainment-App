import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../redux/api/usersApi'
import { toast } from 'react-toastify'


const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [ConfirmpasswordError, setConfirmPasswordError] = useState('')
    
    const [register, {isLoading}] = useRegisterMutation()
    const navigate = useNavigate()


    const submitHandler = async(e) => {
        e.preventDefault()
        setEmailError('')
        setPasswordError('')
        setConfirmPasswordError('')
        
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
        if (confirmPassword !== password) { 
            setConfirmPasswordError('Passwords do not match')
            isValid = false
        }
        
        if (isValid) {
           
            try {
                await register({ email, password }).unwrap();
                navigate('/');
                toast.success("User logged in.");
            } catch (err) {
                toast.error(err.message || err.data.message || "An error occurred during sign up.");
            }
        }
    }

    return (
        <div className="mx-auto my-[9%] px-10 py-3 rounded-[1.5rem] bg-slate-800 shadow-2xl h-[400px] w-[350px]">
            <h1 className="text-[35px] font-semibold mb-4 mt-3">Sign Up</h1>
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
                <div className="relative mt-4">
                    <input
                        className={`bg-transparent border-b-2 rounded-[0.5rem] px-3 py-2 w-full focus:outline-none focus:border-sky-500 ${passwordError ? 'border-red-500' : 'border-slate-600'}`}
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {ConfirmpasswordError && <p className="text-red-500 text-sm mt-1 absolute">{ConfirmpasswordError}</p>}
                </div>
                <button disabled={isLoading} className="bg-red-500 w-full rounded p-2 mt-8" type="submit">Create An Account</button>
            </form>
            <div className='mt-6 text-center'>
                <span>{`Already have an account? `}<Link to={'/auth/login'} className='text-red-500'>Log In</Link></span>
            </div>
        </div>
    )
}

export default Register
