import { useEffect, useState } from 'react';
import './App.css';
import EditComment from './components/EditComment';

function App() {
  const [comments, setComments] = useState([]); // flip comment backward if time
  const [editId, setEditId] = useState(null); // only set when editing

  // get all comments
  const getComments = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/all_comments/');
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    getComments();
  }, []);

  //   delete comment
  const deleteComment = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/delete_comment/${id}/`, {
      method: 'DELETE',
    });
    // fetch comments again from backend
    getComments();
  };

  //   update comment with id and comment
  const updateComment = async (id, comment) => {
    // await so getComment refreshes instantly
    await fetch(`http://127.0.0.1:8000/api/edit_comment/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author: 'Admin',
        text: comment,
        likes: 0,
        date: new Date().toISOString().slice(0, 10), //date conversion to sample format
      }),
    });
    getComments();
  };

  //   add new comment
  const addComment = async (comment) => {
    await fetch(`http://127.0.0.1:8000/api/add_comment/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author: 'Admin',
        text: comment,
        likes: 0,
        date: new Date().toISOString().slice(0, 10), //date conversion to sample format
      }),
    });
    getComments();
  };

  return (
    <div className='main-body'>
      <div>
        <h1>Comments</h1>
      </div>
      <div>
        {/* form showing at top, add comment anytime */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); //dont refresh page
            addComment(e.target.comment.value);
          }}
          className='add-comment'
        >
          <input type='text' name='comment' />
          <button type='submit'>Add comment</button>
        </form>
      </div>
      {/* main comment section */}
      <div className='comment-box'>
        {comments.map((comment) => (
          <div key={comment.id} className='comment-item'>
            <h2>{comment.author}</h2>
            <p>{comment.text}</p>
            <p>Likes: {comment.likes} 👍 </p>
            <p>Date: {comment.date}</p>
            <img src={comment.image} />
            <div>
              <button onClick={() => deleteComment(comment.id)}>Delete</button>
              <button onClick={() => setEditId(comment.id)}>Edit</button>
              {/* if editing render component */}
              {editId === comment.id && (
                <EditComment
                  onSave={(text) => {
                    updateComment(comment.id, text);
                    setEditId(null);
                  }}
                  onCancel={() => setEditId(null)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
