import React from 'react';
import {
    EmailShareButton,
    FacebookMessengerShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    TwitterIcon,
    WhatsappIcon
} from "react-share";

const SocialShare = () => {
    
    const shareUrl = 'https://healthcarepartner.netlify.app'

    return (
        <div>
            <FacebookShareButton
                url={shareUrl}
            >
                {FacebookShareCount => <span className="myShareCountWrapper">{FacebookShareCount}</span>}
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            
            <TwitterShareButton
                url={shareUrl}
                className='mx-2'
            >
                {shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
                <TwitterIcon size={32} round />
            </TwitterShareButton>

            <FacebookMessengerShareButton
                url={shareUrl}
                className='mx-2'
            >
                {shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
                <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>

            <WhatsappShareButton
                url={shareUrl}
                className='mx-2'
            >
                {shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
                <WhatsappIcon size={35} round />
            </WhatsappShareButton>

            <EmailShareButton
                url={shareUrl}
                className='mx-2'
            >
                {shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
                <EmailIcon size={35} round />
            </EmailShareButton>

        </div>
    );
};

export default SocialShare;