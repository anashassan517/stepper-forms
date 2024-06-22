import React, { useState } from 'react';

const Stepper = ({ currentStep, totalSteps, goBack }) => {
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 80 + 20;

    return (
        <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
            <div className="flex justify-between items-center p-4">
                {currentStep > 1 && (
                    <button
                        onClick={goBack}
                        type="button"
                        className="flex items-center text-lg text-gray-700 transition-colors duration-200 gap-x-2 dark:text-black font-bold"
                    >
                        <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span>Go Back</span>
                    </button>
                )}
                <span className="text-lg font-bold text-black">{`Step ${currentStep} of ${totalSteps}`}</span>
                {currentStep > 1 && (
                    <button
                        // onClick={() => window.location.reload()}
                        type="button"
                        className="flex items-center text-lg text-gray-700 transition-colors duration-200 gap-x-2 dark:text-black font-bold"
                    >
                        <span>Edit</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                        </svg>

                    </button>
                )}
            </div>
            <div className="flex justify-center">
                <div className="flex space-x-4">
                    {Array.from({ length: totalSteps }).map((_, index) => (
                        <div key={index} className="flex items-center">
                            {index < totalSteps - 1 && (
                                <div
                                    className={`flex h-1 ${index < currentStep - 1 ? 'bg-green-500' : 'bg-gray-200'
                                        }`}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-2 bg-green-600" style={{ width: `${progress}%` }}></div>
        </div>
    );
};



const Step1 = ({ nextStep, handleChange, values }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-16 bg-gray-100 text-black">
            <h2 className="mb-4 text-2xl font-semibold text-center">Step #1</h2>
            <p className="mb-6 text-center">What is your monthly digital marketing budget?</p>
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                <div className="space-y-4">
                    {['< $1,000/mo', '$1,000 - $2,000', '$2,000 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000 +'].map((budget, index) => (
                        <button
                            key={index}
                            className={`w-full px-4 py-2 text-center text-black rounded border-2 border-gray-100 ${values.budget === budget ? 'bg-slate-200' : 'bg-white-500 hover:bg-slate-100'}`}
                            onClick={() => { handleChange('budget', budget); nextStep(); }}
                        >
                            {budget}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Step2 = ({ prevStep, nextStep, handleChange, values }) => {
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!values.name) newErrors.name = 'Name is required';
        if (!values.email) newErrors.email = 'Email is required';
        if (!values.phone) newErrors.phone = 'Phone number is required';
        return newErrors;
    };

    const handleNext = () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            nextStep();
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-16 bg-gray-100 text-black">
            <h2 className="mb-4 text-2xl font-semibold text-center text-black">Step #2</h2>
            <p className="mb-6 text-center text-black">We're thrilled at the opportunity to help you grow your business online.</p>
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={values.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`w-full px-4 py-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`w-full px-4 py-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={values.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={`w-full px-4 py-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                    <textarea
                        placeholder="Anything else you'd like to share?"
                        value={values.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                    />
                    <button
                        type="button"
                        onClick={handleNext}
                        className="w-full px-4 py-2 text-center text-white bg-green-500 rounded hover:bg-green-700"
                    >
                        Send Request
                    </button>
                </form>
            </div>
        </div>
    );
};

const Step3 = ({ prevStep }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-16 bg-gray-100 text-black">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                <div className="text-center">
                    <div className="mb-4">
                        <img src="/check.png" alt="Checkmark" className="w-16 h-16 mx-auto" />
                    </div>
                    <h2 className="mb-4 text-2xl font-semibold">Your Request for a Proposal Has Been Submitted!</h2>
                    <p className="mb-6">Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies dis gravida parturient urna tristique congue.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full px-4 py-2 text-center text-white bg-green-500 rounded hover:bg-green-700"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        </div>
    );
};

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formValues, setFormValues] = useState({
        budget: '',
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleChange = (input, value) => {
        setFormValues({ ...formValues, [input]: value });
    };

    const totalSteps = 3;

    return (
        <div>
            <Stepper currentStep={step} totalSteps={totalSteps} goBack={prevStep} />
            {step === 1 && <Step1 nextStep={nextStep} handleChange={handleChange} values={formValues} />}
            {step === 2 && <Step2 prevStep={prevStep} nextStep={nextStep} handleChange={handleChange} values={formValues} />}
            {step === 3 && <Step3 prevStep={prevStep} />}
        </div>
    );
};

export default MultiStepForm;