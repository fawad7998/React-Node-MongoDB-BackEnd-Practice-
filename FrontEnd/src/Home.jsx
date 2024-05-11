import { useEffect, useState } from 'react';
import FormData from './component/Create';

function Data() {
    const [posts, setPosts] = useState([]);
    const [editPost, setEditPost] = useState(null);

    // View Section
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3000/api/v1/view');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setPosts(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);



    const handleDelete = async (postId) => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/v1/remove/${postId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Post deleted successfully');
                setPosts(posts.filter(post => post._id !== postId));
            } else {
                console.error('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


    // Edit Section
    const handleEdit = (post) => {
        setEditPost(post);
    };

    const handleUpdate = async (updatedPost) => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/v1/update/${updatedPost._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPost)
            });

            if (response.ok) {
                console.log('Post updated successfully');
                setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));
                setEditPost(null);
            } else {
                console.error('Failed to update post');
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditPost(null);
    };

    return (
        <div className="container mx-auto px-4">
            <FormData />
            <div className="grid grid-cols-1 gap-4 mt-8">
                {posts.map((post) => (
                    <div key={post._id} className="bg-white rounded-lg shadow-md p-4">
                        {editPost && editPost._id === post._id ? (
                            <div>
                                <input type="text" value={editPost.title} onChange={(e) => setEditPost({ ...editPost, title: e.target.value })} className="border border-gray-300 rounded-md px-2 py-1 mb-2" />
                                <input value={editPost.description} onChange={(e) => setEditPost({ ...editPost, description: e.target.value })} className="border border-gray-300 rounded-md px-2 py-1 mb-2" />
                                <button onClick={() => handleUpdate(editPost)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2">Update</button>
                                <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <div className="font-semibold text-xl">{post.title}</div>
                                <div className="text-gray-700 mt-2">{post.description}</div>
                                <div className="mt-4 flex justify-between items-center">
                                    <button onClick={() => handleEdit(post)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2">Edit</button>
                                    <button onClick={() => handleDelete(post._id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Delete</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Data;
