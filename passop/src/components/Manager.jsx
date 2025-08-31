import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast(text + ' Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

            transition: "Bounce",
        }); navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"


        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "password"

        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length>3) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });            
        }
        else{
            toast('Error:Password not saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });                
        }

        // setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        //     localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        //     console.log([...passwordArray, form])
        //     setform({ site: "", username: "", password: "" })
        //     toast('Password saved!', {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "dark",
        //     });    
    }

    const deletePassword = (id) => {
        console.log("Deleting password with id = ", id)
        let c = confirm("Do you really want to delete this Password")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        console.log("Editing password with id = ", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">
                </div>
            </div>

            <div className="px-2 mt-10 md:p-0 mycontainer">
                <h1 className='text-3xl font-bold text-center'>
                    <span className='text-green-500'> &lt; </span>
                    <span>
                        Pass
                    </span>
                    <span className='text-green-500'>OP/&gt; </span>
                </h1>
                <p className='text-green-700  text-center'>Your own Password Manager</p>

                <div className='text-black flex flex-col p-4 gap-8 items-center '>

                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1 mt-5' type="text" name='site' id='site' />

                    <div className='flex flex-col md:flex-row w-full justify-between gap-4'>

                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='username' id='username' />
                        <div className='relative '>

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' id='password' />
                            <span className="absolute right-0 mt-1 pr-3">
                                <img className=' cursor-pointer' ref={ref} onClick={showPassword} width={23} src="icons/eye.png" alt="" />
                            </span>
                        </div>

                    </div>
                    <button onClick={savePassword} className='justify-center items-center flex bg-green-400 py-2 px-4 hover:bg-green-300 w-fit rounded-full gap-2 border border-green-700'>

                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password</button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold py-2 text-xl'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div> No passwords to show  </div>}
                    {passwordArray.length != 0 && <table className="table-aut w-full rounded-md overflow-hidden  mb-13">

                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th>Site</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='flex  justify-center items-center text-center w-full  py-2 border border-white'>
                                        <div className='flex justify-center items-center' onClick={() => { copyText(item.site) }} >

                                            <a href="{item.site}" target='_blank' >{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer'>
                                                <lord-icon
                                                    style={{ "wdith": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' text-center  py-2 border border-white'>
                                        <div className='flex justify-center items-center'>

                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }} >
                                                <lord-icon
                                                    style={{ "wdith": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>

                                    </td>
                                    <td className='  text-center  py-2 border border-white'>
                                        <div className='flex justify-center items-center' >

                                            <span>{item.password}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }} >
                                                <lord-icon
                                                    style={{ "wdith": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='  text-center  py-2 border border-white'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => {
                                            deletePassword(item.id)
                                        }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>

                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>

            </div>
        </>
    )
}

export default Manager; 
