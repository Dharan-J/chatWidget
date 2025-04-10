import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Box, Button, Divider, Typography, Chip } from "@mui/material";

// Common styled components
const RootStyle = styled("div")(({ theme }) => ({
 display: "flex",
 marginBottom: theme.spacing(3),
}));

const ContentStyle = styled("div")(({ theme }) => ({
 maxWidth: 500,
 padding: theme.spacing(1),
 marginTop: theme.spacing(0.5),
 borderRadius: theme.shape.borderRadius,
 backgroundColor: theme.palette.background.neutral,
 overflowWrap: "break-word",
 wordWrap: "break-word",
 hyphens: "auto",
}));

const InfoStyle = styled(Typography)(({ theme }) => ({
 display: "flex",
 marginBottom: theme.spacing(0.75),
 color: theme.palette.text.secondary,
}));

ChatMessageItem.propTypes = {
 message: PropTypes.object.isRequired,
 onOpenLightbox: PropTypes.func,
};
export function formatTime(dateString) {
 const date = new Date(dateString + " UTC");

 let hours = date?.getHours();
 const minutes = date?.getMinutes();

 const ampm = hours >= 12 ? "PM" : "AM";

 hours = hours % 12;
 hours = hours ? hours : 12;

 const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

 return `${hours}:${formattedMinutes} ${ampm}`;
}

export default function ChatMessageItem({ message, sender, onSendMessage }) {
 const isMe = message?.messageType !== "OUTGOING" || message?.isAgent;
 const isTime = message?.time
  ? formatTime(message.time)
  : formatTime(Date.now());

 const handleUserActions = (value) => {
  onSendMessage(value);
 };
 const renderMessageContent = () => {
  if (
   Array.isArray(message?.message?.data) &&
   message?.message?.data?.length > 0
  ) {
   return message.message.data.map((messageItem, index) => (
    <div key={index}>
     {Array.isArray(messageItem?.text) ? (
      <>
       {messageItem.text
        .filter((item) => item.textMessage)
        .map((item, idx) => (
         <Typography key={idx} variant="body2">
          {item.textMessage}
         </Typography>
        ))}
       {messageItem.text.filter((item) => item.dn && item.value).length > 0 && (
        <Divider />
       )}
       <ul
        style={{
         padding: 0,
         margin: 0,
         display: "flex",
         justifyContent: "space-evenly",
        }}
       >
        {messageItem.text
         .filter((item) => item.dn && item.value)
         .map((item) => (
          <li
           key={item.dn}
           style={{
            padding: "2px",
            listStyle: "none",
            marginTop: "2px",
           }}
          >
           <Button
            variant="filled"
            onClick={() => handleUserActions(item.value)}
           >
            {item.dn}
           </Button>
          </li>
         ))}
       </ul>
      </>
     ) : (
      <Typography variant="body2">
       {messageItem?.text?.body || messageItem?.text}
      </Typography>
     )}
    </div>
   ));
  }

  return (
   <Typography variant="body2">
    {message ||
     message?.text ||
     (typeof message?.message === "string" && message?.message) ||
     message?.message?.data ||
     (typeof message?.message === "object" &&
      (message?.message?.message || message?.message?.inComing)) ||
     message?.message?.data?.[0]?.text}
   </Typography>
  );
 };

 return (
  <>
   {message?.message?.message === "Agent Assigned" ? (
    <Divider>
     <Chip label={message?.message?.message} size="small" />
    </Divider>
   ) : (
    <RootStyle>
     <Box
      sx={{
       display: "flex",
       ...(isMe && {
        ml: "auto",
       }),
      }}
     >
      <div>
       <InfoStyle
        variant="caption"
        sx={{
         ...(isMe && { justifyContent: "flex-end" }),
        }}
       />
       <Box
        sx={{
         display: "flex",
         gap: 1,
         position: "relative",
         ...(!isMe && { flexDirection: "row-reverse" }),
         "&:hover .icon-container": {
          opacity: 1, // Show the icon box on hover
         },
        }}
       >
        <ContentStyle
         className={`chat-message ${sender}-message`}
        >
         {renderMessageContent()}
         <Box
          sx={{
           display: "flex",
           justifyContent: "flex-end",
           color: "#718096",
           gap: 0.5,
          }}
         >
          <Typography variant="body2" sx={{ fontSize: "10px" }}>
           {isTime}
          </Typography>
         </Box>
        </ContentStyle>
       </Box>
      </div>
     </Box>
    </RootStyle>
   )}
  </>
 );
}
