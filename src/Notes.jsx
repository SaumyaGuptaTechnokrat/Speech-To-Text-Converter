import React from 'react';
import { Link } from 'react-router-dom';
import './Notes.css'
const Notes = ({ notes }) => {
  // Filter out empty notes
  const validNotes = notes.filter((note) => note.text.trim() !== '');

  return (
    <div className='notes-container text-center p-5 relative'>
      {/* Back Button - Fixed at Top Left */}
      <Link to="/">
        <button className='fixed top-4 left-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 back-button'
        style={{position:"fixed",left:"5px",top:"350px", width:"8px",textAlign:"center"}}>
          ⬅ 
        </button>
      </Link>

      <h2 className='text-2xl font-bold mb-4'>Saved Notes</h2>

      {validNotes.length > 0 ? (
        <ul className='list-disc text-left mx-auto w-2/3'>
          {validNotes.map((note) => (
            <li key={note.id} className='p-2 border-b border-gray-300'>
              <p>{note.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-gray-500'>No saved notes available.</p>
      )}
    </div>
  );
};

export default Notes;
