import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser'
import Alert from "./Alert";
import useAlert from "./useAlert";

const Contact = () => {
    const { alert, showAlert, hideAlert } = useAlert();
    const formRef = useRef();
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false)
    const handleChange = ({target: {name, value}}) => {
        setForm({ ...form, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
    
        emailjs
          .send(
            'service_hcrn6yr',
            'template_ysy1mp4', {
              from_name: form.name,
              to_name: 'Kenneth David',
              from_email: form.email,
              to_email: 'kennethdavid256@gmail.com',
              message: form.message,
            },
            'ggo0xCKrNpkaucZRV',
          )
          .then(
            () => {
              setLoading(false);
              showAlert({
                show: true,
                text: 'Thank you for your message 😃',
                type: 'success',
              });
    
              setTimeout(() => {
                hideAlert(false);
                setForm({
                  name: '',
                  email: '',
                  message: '',
                });
              }, [3000]);
            },
            (error) => {
              setLoading(false);
              console.error(error);
    
              showAlert({
                show: true,
                text: "I didn't receive your message 😢",
                type: 'danger',
              });
            },
          );
      };
       
  return (
    <section className="c-space my-20">
          {alert.show && <Alert {...alert} />}
      <div className="relative justify-center mb-5 flex-col min-h-screen flex items-center">
        {/* <img
          src="/assets/terminal.png"
          alt="terminal"
          className="min-h-screen inset-0 absolute"
        /> */}
        <div className="contact-container">
        <h3 className="head-text">Let's Talk </h3>
        <p className="text-lg text-white-600 mt-3">
          Are you looking to build a new website, improve your existing
          platform, or bring a unique project to life, I’m here to help.
        </p>
        <form className="mt-10 flex flex-col space-y-7" ref={formRef} onSubmit={handleSubmit}>
            <label className='space-y-3'>
                <span className="field-label">Full Name:</span>
                <input type="text" className="field-input" placeholder="Kenneth David" name='name' value={form.name} onChange={handleChange} required/>
            </label>
            <label className='space-y-3'>
                <span className="field-label">Email:</span>
                <input type="text" className="field-input" placeholder="Kennethdavid@gmail.com" name='email' value={form.email} onChange={handleChange} required/>
            </label>
            <label className='space-y-3'>
                <span className="field-label">Message:</span>
                <textarea type="text" className="field-input" name="message" placeholder="Hi, i'm interested....." value={form.message} onChange={handleChange} rows={5} required/>
            </label>
            <button className="field-btn my-2" type="submit" >
                {loading ? 'Submiting....' : 'Send message'}
                <img src="/assets/arrow-up.png" className="field-btn_arrow" alt="arrow-up"/>
            </button>

        </form>
      </div>
      </div>
    </section>
  );
};

export default Contact;
