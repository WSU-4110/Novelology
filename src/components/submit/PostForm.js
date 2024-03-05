import { FaPaperPlane } from "react-icons/fa";
import {FaFileImage} from 'react-icons/fa'
function PostForm({ sendMessage, handleFileChange, handleChange, handleKeyDown, formValue, file, fileInputRef, textAreaRef }) {
  
    return (
    <>
    <div class="">
    <form class="">
        
        <div className="bg-gray-300 rounded-t p-2">
          <label htmlFor="file-input" className="">
            <div className="">
              <span className=""><FaFileImage/></span>
            </div>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            disabled={file !== null}
            id="file-input"
            hidden
          />
        </div>
        <div className="relative w-full min-w-[200px]">
          <textarea
            value={formValue}
            ref={textAreaRef}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            
            class="peer h-full min-h-[100px] w-full resize-none rounded-b-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 "
            placeholder="Text (Optional)"></textarea>
          

        
        </div>
        </form>
        <div class="border boder-gray-300 mt-2 mb-2"></div>
        <div class='flex justify-end'> 

        
        <button  onClick={(e) => sendMessage(e)} class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full">
          submit
      </button>
      </div>  
      
      
    

</div>
    </>
    );
  }
  
  export default PostForm;