import '../App.css';

function EditComment({ onSave, onCancel }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(e.target.comment.value);
      }}
    >
      <textarea name='comment' />
      <button type='submit'>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EditComment;
