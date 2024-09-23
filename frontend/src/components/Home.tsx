import React, { useState } from 'react';
import '../css/style.css'; // Import your CSS for styling
import friends from '../images/friends.png';
import news from '../images/news.png';
import marketplace from '../images/marketplace.png';
import profile_pic from '../images/profile-pic.png';
import photo from '../images/photo.png';
import member_2 from '../images/member-2.png';
import member_1 from '../images/member-1.png';
import haha from '../images/haha.png';
import like from '../images/like-blue.png';
import sad from '../images/sad.png';
import wow from '../images/wow.png';
import heart from '../images/heart.png';
import angry from '../images/angry.png';
import care from '../images/care.png';
import feeling from '../images/feeling.png';
import betta from '../e-commerce/images/betta-siamese.png'
import { Link } from 'react-router-dom';

const Home = () => {
  const [isTextPostModalOpen, setTextPostModalOpen] = useState(false);
  const [isPhotoVideoModalOpen, setPhotoVideoModalOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false); 
  const [comment, setComment] = useState('');
  const [commentInputValue, setCommentInputValue] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);
  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
  };


  const [PostshowEmojis, PostsetShowEmojis] = useState(false);
  const [PostselectedEmoji, PostsetSelectedEmoji] = useState<string | null>(null);
  const [PostselectedEmojiName, PostsetSelectedEmojiName] = useState('');

  const PostchangeEmoji = (emojiSrc: string, name: string) => {
    PostsetSelectedEmoji(emojiSrc);       // Set the selected emoji image source
    PostsetSelectedEmojiName(name);       // Set the selected emoji name
    PostsetShowEmojis(false);             // Hide the emoji options
  };
  

  const [CommentshowEmojis, CommentsetShowEmojis] = useState(false);
  const [CommentselectedEmoji, CommentsetSelectedEmoji] =  useState<string | null>(null);
  const [CommentselectedEmojiName, CommentsetSelectedEmojiName] = useState('');

  const CommentchangeEmoji = (emojiSrc: string , name: string) => {
    CommentsetSelectedEmoji(emojiSrc); // Set the selected emoji
    CommentsetSelectedEmojiName(name); 
    CommentsetShowEmojis(false); // Hide the emoji options
  };

  const showTextPostModal = () => setTextPostModalOpen(true);
  const showPhotoVideoModal = () => setPhotoVideoModalOpen(true);
  const closeModal = (modalSetter: { (value: React.SetStateAction<boolean>): void; (value: React.SetStateAction<boolean>): void; (value: React.SetStateAction<boolean>): void; (value: React.SetStateAction<boolean>): void; (value: React.SetStateAction<boolean>): void; (value: React.SetStateAction<boolean>): void; (arg0: boolean): any; }) => modalSetter(false);

 const submitTextPost = () => {
  const contentElement = document.getElementById('textPostContent') as HTMLTextAreaElement | null;
  if (contentElement) {
    const content = contentElement.value;
    console.log('Text Post Content:', content);
    closeModal(setTextPostModalOpen);
  }
};

const submitPhotoVideoPost = () => {
  const fileInputElement = document.getElementById('photoVideoUpload') as HTMLInputElement | null;
  const contentElement = document.getElementById('photoVideoContent') as HTMLTextAreaElement | null;
  if (fileInputElement && contentElement) {
    const files = fileInputElement.files;
    const content = contentElement.value;

    console.log('Photo/Video Files:', files);
    console.log('Post Content:', content);
    closeModal(setPhotoVideoModalOpen);
  }
};

const toggleDropdown = (dropdownId: string) => {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  }
};

const setVisibility = (option: string, dropdownId: string) => {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    const visibilityText = dropdown.previousElementSibling as HTMLElement;
    if (visibilityText) {
      visibilityText.innerHTML = `${option} <i className="fa fa-caret-down"></i>`;
    }
    toggleDropdown(dropdownId);
  }
};

const submitSharePost = () => {
  const contentElement = document.getElementById('shareContent') as HTMLTextAreaElement | null;
  if (contentElement) {
    const content = contentElement.value;
    console.log('Share Post Content:', content);
    closeModal(setShareModalOpen);
  }

  
};

const submitComment = () => {
  if (comment.trim() !== '') {
    console.log('Comment Content:', comment);
    setComment(''); // Clear input after submission
    setCommentModalOpen(false); // Close modal after submission
  }
};




  return (
    <body>
      
  
    <div className="container">
      <div className="sidebar-left">
        <div className="imp-links">
          <a href="/"><img src={news} alt="News" />Latest News</a>
          <a href="/friends"><img src={friends} alt="Fish find" />Friends</a>
          <Link to="/ecommerce" className="link">
      <img src={marketplace} alt="Fish Shopping" />
      Store 
    </Link>
    
        </div>
      </div>

      <div className="main-content">
 

        <div className="write-post-container">
          <div className="user-profile">
            <img src={profile_pic} alt="Profile" />
            <div>
              <p>John Nicholson</p>
              <small>Public <i className="fa fa-caret-down"></i></small>
            </div>
          </div>

          <div className="post-input-container">
            <textarea
              id="post-textarea"
              cols={80}
              rows={1}
              placeholder="What's on your mind, John?"
              onClick={showTextPostModal}
            ></textarea>
          </div>
          <div className="add-post-links">
            <a href="#" onClick={showPhotoVideoModal}><img src={photo} alt="Photo/Video" />Photo/Video</a>
            <a href="#"><img src={feeling} alt="Feeling Activity" />Feeling Activity</a>
          </div>
        </div>

        {/* Text Post Modal */}
        {isTextPostModalOpen && (
          <div id="textPostModal" className="modal">
            <div className="modal-content">
              <h1 style={{ textAlign: 'center', fontSize: '16px' }}>Create Post</h1>
              <span className="close" onClick={() => closeModal(setTextPostModalOpen)}>&times;</span>
              <div className="user-profile" style={{ padding: '12px' }}>
                <img src={member_2} alt="Profile" />
                <div>
                  <p>John Nicholson</p>
                  <small onClick={() => toggleDropdown('dropdownText')}>Public <i className="fa fa-caret-down"></i></small>
                  <div id="dropdownText" className="dropdown-content">
                    <a href="#" onClick={() => setVisibility('Public', 'dropdownText')}>Public</a>
                    <a href="#" onClick={() => setVisibility('Friends', 'dropdownText')}>Friends</a>
                    <a href="#" onClick={() => setVisibility('Only Me', 'dropdownText')}>Only Me</a>
                  </div>
                </div>
              </div>
              <textarea id="textPostContent" cols={62} rows={3} placeholder="What's on your mind, John?"></textarea>
              <button onClick={submitTextPost}>Post</button>
            </div>
          </div>
        )}

        {/* Photo/Video Post Modal */}
        {isPhotoVideoModalOpen && (
          <div id="photoVideoModal" className="modal">
            <div className="modal-content">
              <h1 style={{ textAlign: 'center', fontSize: '16px' }}>Create Post</h1>
              <span className="close" onClick={() => closeModal(setPhotoVideoModalOpen)}>&times;</span>
              <div className="user-profile" style={{ padding: '12px' }}>
                <img src={member_2} alt="Profile" />
                <div>
                  <p>John Nicholson</p>
                  <small onClick={() => toggleDropdown('dropdownPhotoVideo')}>Public <i className="fa fa-caret-down"></i></small>
                  <div id="dropdownPhotoVideo" className="dropdown-content">
                    <a href="#" onClick={() => setVisibility('Public', 'dropdownPhotoVideo')}>Public</a>
                    <a href="#" onClick={() => setVisibility('Friends', 'dropdownPhotoVideo')}>Friends</a>
                    <a href="#" onClick={() => setVisibility('Only Me', 'dropdownPhotoVideo')}>Only Me</a>
                  </div>
                </div>
              </div>
              <textarea id="photoVideoContent" cols={60} rows={3} placeholder="Say something about this photo/video..."></textarea>
              <input type="file" id="photoVideoUpload" multiple />
              <button onClick={submitPhotoVideoPost}>Post</button>
            </div>
          </div>
        )}

       

<div className="post-container">
  <div className="post-row">
    <div className="user-profile">
      <img src={profile_pic} alt="User" />
      <div>
        <p>John Nicholson</p>
        <small>Public <i className="fa fa-caret-down"></i></small>
      </div>
      <a href="#"><i className="fa fa-ellipsis-vertical"></i></a>
    </div>
  </div>

  <div className="post-text">
    <p>Betta Splender high breed!</p>
    <img src={betta} alt="Post" className="post-img" />
  </div>

  <hr />

  <div className="post-engagement">
    <div className="engagement-item">
      <i className="fa fa-thumbs-up"></i> 120 Likes
    </div>
    <div className="engagement-item">
      <i className="fa fa-comment"></i> 45 Comments
    </div>
    <div className="engagement-item">
      <i className="fa fa-share"></i> 20 Shares
    </div>
  </div>

  <hr />

  <div className="post-row">
    <div className="activity-icons">
      <div 
        className="reaction-button"
        onMouseEnter={() => PostsetShowEmojis(true)}
        onMouseLeave={() => PostsetShowEmojis(false)}
      >
        <a href="#" className="like-reply">
  {PostselectedEmoji ? (
    <div className="selected-emoji-container">
      <img src={PostselectedEmoji} alt="Selected Emoji" className="selected-emoji" />
      <span className="emoji-name">{PostselectedEmojiName}</span>
    </div>
  ) : (
    <div>
      <i className="fa fa-thumbs-up"></i> Like
    </div>
  )}
</a>

        
        {PostshowEmojis && (
          <div className="emoji-options">
            <img src={like} alt="Like" onClick={() => PostchangeEmoji(like, 'Like')} />
            <img src={haha} alt="Haha" onClick={() => PostchangeEmoji(haha, 'Haha')} />
            <img src={sad} alt="Sad" onClick={() => PostchangeEmoji(sad, 'Sad')} />
            <img src={wow} alt="Wow" onClick={() => PostchangeEmoji(wow, 'Wow')} />
            <img src={heart} alt="Heart" onClick={() => PostchangeEmoji(heart, 'Heart')} />
            <img src={angry} alt="Angry" onClick={() => PostchangeEmoji(angry, 'Angry')} />
            <img src={care} alt="Care" onClick={() => PostchangeEmoji(care, 'Care')} />
          </div>
        )}
      </div>

      <div className="comment-button">
        <a href="#" className="comment-reply" onClick={() => setCommentModalOpen(true)}>
          <i className="fa fa-comment"></i> Comment
        </a>
      </div>

      <div className="share-button">
        <a href="#" className="share-reply" onClick={() => setShareModalOpen(true)}>
          <i className="fa fa-share"></i> Share
        </a>
      </div>
    </div>
  </div>
</div>



       

        {/* Share Post Modal */}
        {isShareModalOpen && (
          <div id="shareModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => closeModal(setShareModalOpen)}>&times;</span>
              <h1 style={{ textAlign: 'center', fontSize: '16px' }}>Share Post</h1>
              <div className="user-profile" style={{ marginBottom: '2%' }}>
                <img src={profile_pic} alt="User Image" />
                <div>
                  <p>John Nicholson</p>
                  <small onClick={() => toggleDropdown('shareDropdown')}>Public <i className="fa fa-caret-down"></i></small>
                  <div id="shareDropdown" className="dropdown-content">
                    <a href="#" onClick={() => setVisibility('Public', 'shareDropdown')}>Public</a>
                    <a href="#" onClick={() => setVisibility('Friends', 'shareDropdown')}>Friends</a>
                    <a href="#" onClick={() => setVisibility('Only Me', 'shareDropdown')}>Only Me</a>
                  </div>
                </div>
              </div>
              <textarea id="shareContent" placeholder="Say something about this..." cols={75} rows={4}></textarea>
              <img src={betta} alt="Post Image" className="post-img" />
              <button type="button" onClick={submitSharePost}>Share Post</button>
            </div>
          </div>
        )}
      </div>


      {isCommentModalOpen && (
      <div id="commentModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => setCommentModalOpen(false)}>&times;</span>

          {/* User Profile Section */}
          <div className="user-profile" style={{ marginBottom: '2%' }}>
            <img src={profile_pic} alt="User Image" />
            <div>
              <p>John Nicholson</p>
              <small onClick={() => toggleDropdown('shareDropdown')}>
                Public <i className="fa fa-caret-down"></i>
              </small>
              <div id="shareDropdown" className="dropdown-content">
                <a href="#" onClick={() => setVisibility('Public', 'shareDropdown')}>Public</a>
                <a href="#" onClick={() => setVisibility('Friends', 'shareDropdown')}>Friends</a>
                <a href="#" onClick={() => setVisibility('Only Me', 'shareDropdown')}>Only Me</a>
              </div>
            </div>
          </div>

          {/* Post Image */}
          <img src={betta} alt="Post Image" className="comment-img" />

          {/* Likes, Comments, and Shares Section */}
          <div className="post-interaction">
            <p><i className="bx bx-like"></i> 123 Likes</p>
            <p><i className="bx bx-comment"></i> 45 Comments</p>
            <p><i className="bx bx-share"></i> 12 Shares</p>
          </div>

          {/* Fetch and Display User Comments */}
          <div className="comments-section">
            <div className="comment-item">
              <img src={member_2} alt="User Icon" className="comment-user-icon" />
              <div className="comment-details">
                <p className="comment-user-name">Glenn Angelo Oliva</p>
                <p className="comment-text">Wow so nice fish!</p>
                <div className="comment-actions">
                  <small>1hr ago</small>

                  {/* Like Button with Hover Emoji Options */}
                  <div 
                    className="like-reply1 reaction-button" 
                    onMouseEnter={() => CommentsetShowEmojis(true)}
                    onMouseLeave={() => CommentsetShowEmojis(false)}
                  >
           <a href="#" className="like-reply1">
  {CommentselectedEmoji ? (
    <>
      <img src={CommentselectedEmoji} alt="Selected Emoji" className="selected-emoji" />
      <span className="emoji-name">{CommentselectedEmojiName}</span>
    </>
  ) : (
    'Like'
  )}
</a>
{CommentshowEmojis && (
  <div className="emoji-options">
    <img src={like} alt="Like" onClick={() => CommentchangeEmoji(like, 'Like')} />
    <img src={haha} alt="Haha" onClick={() => CommentchangeEmoji(haha, 'Haha')} />
    <img src={sad} alt="Sad" onClick={() => CommentchangeEmoji(sad, 'Sad')} />
    <img src={wow} alt="Wow" onClick={() => CommentchangeEmoji(wow, 'Wow')} />
    <img src={heart} alt="Heart" onClick={() => CommentchangeEmoji(heart, 'Heart')} />
    <img src={angry} alt="Angry" onClick={() => CommentchangeEmoji(angry, 'Angry')} />
    <img src={care} alt="Care" onClick={() => CommentchangeEmoji(care, 'Care')} />
  </div>
)}

                  </div>
                  
                  <a href="#" className="like-reply" onClick={handleReplyClick}>Reply</a>
                </div>
              </div>
            </div>

            {/* Conditionally Render Reply Input Section */}
            {showReplyInput && (
              <div className="input-container1">
                <img src={member_2} alt="User Icon" className="comment-user-icon" />
                <input 
                  type="text" 
                  placeholder="Reply as User" 
                  value={commentInputValue}
                  onChange={(e) => setCommentInputValue(e.target.value)} 
                  className="comment-input"
                />
                <i 
                  className="bx bx-send send-icon" 
                  onClick={submitComment}>
                </i>
              </div>
            )}

<div className="input-container">
                <img src={member_2} alt="User Icon" className="comment-user-icon" />
                <input 
                  type="text" 
                  placeholder="Comment as User" 
                  className="comment-input"
                />
                <i 
                  className="bx bx-send send-icon" 
                  onClick={submitComment}>
                </i>
              </div>
          </div>
        </div>
      </div>
    )}


      <div className="sidebar-right">
        <div className="sidebar-title">
          <h4>Friend Requests</h4>
          <a href="/friends">See All</a>
        </div>

        <div className="friend-request">
          <div className="left-request">
            <img src={member_2} alt="Profile Image" />
          </div>
          <div className="right-request">
            <h4>John Doe</h4>
            <p><i className="fa fa-user"></i>2 mutual friends</p>
            <button className="confirm-btn">Confirm</button>
            <button className="decline-btn">Decline</button>
          </div>
        </div>

        <div className="friend-request">
          <div className="left-request">
            <img src={member_1} alt="Profile Image" />
          </div>
          <div className="right-request">
            <h4>Jane Smith</h4>
            <p><i className="fa fa-user"></i>5 mutual friends</p>
            <button className="confirm-btn">Confirm</button>
            <button className="decline-btn">Decline</button>
          </div>
        </div>
      </div>
    </div>
    </body>
  );
};

export default Home;
