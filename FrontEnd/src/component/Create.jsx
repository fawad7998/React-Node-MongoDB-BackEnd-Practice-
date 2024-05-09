import { useState } from "react";

const FormData = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:3000/api/v1/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Post created successfully');
                setFormData({ title: '', description: '' });
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className=" bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-6">Create New Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-gray-800 font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-gray-800 font-semibold mb-2">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600"
                        >
                            SEND
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormData;
