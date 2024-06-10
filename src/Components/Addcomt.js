import { useState,useEffect } from "react";
import { FaHeart } from "react-icons/fa";

function Addcomt(){
    const [newcmnt, setnewcmnt]=useState(" ");
    const [comments, setcomments]=useState([]);
    const [clr, newclr]=useState(false);
    const names=['Alice', 'Bob', 'Charlie', 'Diana', 'Edward', 'Fiona'];

    useEffect(() => {
        const savedComments = JSON.parse(localStorage.getItem('comments'));
        if (savedComments) {
            setcomments(savedComments);
        }
      }, []);

    const getRandomName = () => {
        return names[Math.floor(Math.random() * names.length)];
      };
    
    function handleInputChange(e){
       setnewcmnt(e.target.value);
    }
    function AddComment(){
        if (newcmnt.trim()) {
            const commentWithUser = {
                text: newcmnt,
                user: getRandomName(),
              };
           
            const updatedComments = [...comments, commentWithUser];
            setcomments(updatedComments);
            localStorage.setItem('comments', JSON.stringify(updatedComments));
            setnewcmnt('');
          }
    }
    function changeclr(){
        newclr(!clr);

    }
    const DeleteComment = (index) => {
        const updatedComments = [...comments];
        updatedComments.splice(index, 1);
        setcomments(updatedComments);
        localStorage.setItem('comments', JSON.stringify(updatedComments));
      };

    


 return(
    <div>
    <div className="flex flex-col justify-center items-center">
        <textarea 
        className="w-[400px] h-20 p-2 mb-4 border rounded-md border-black mx-auto"
        placeholder="write a new comment..."
        onChange={handleInputChange}
        value={newcmnt}
        ></textarea> 
         <button className="w-[150px] bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 "
         onClick={AddComment} >
        Add Comment
         </button>  
    </div>
    <div className="mt-4 space-y-4 flex flex-col">
        {comments.map((comment, index) => (
          <div key={index} className="p-4 border rounded-md bg-gray-100 w-[500px] mx-auto text-slate-500">
            <h2 className="text-lg text-black">{comment.user}</h2>
            {comment.text}
            <div  className="flex pt-5">
            <h1 className="mt-2 cursor-pointer" onClick={changeclr}><FaHeart  className={`text-${clr ? 'red-600' : 'slate-300'} `}/></h1>
            <h2 className="text-blue-300 ml-16 cursor-pointer">Reply</h2>
            <h2 className="text-red-400 ml-[45px] cursor-pointer " onClick={() => DeleteComment(index)}>Remove</h2>
            
            </div>
          </div>
        ))}
      </div>
    </div>
     
)
}
export default Addcomt;