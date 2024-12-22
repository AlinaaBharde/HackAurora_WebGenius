// import { MeetingProvider } from "@videosdk.live/react-sdk";
// import { useEffect } from "react";
// import { useState } from "react";
// import { MeetingAppProvider } from "../MeetingAppContextDefSW";
// import { MeetingContainer } from "../meetingSW/MeetingContainer";
// import { LeaveScreen } from "../componentsSW/screens/LeaveScreen";
// import { JoiningScreen } from "../componentsSW/screens/JoiningScreen"
// import Navbar from "../components/NavbarAB";

// function App() {
//     const [token, setToken] = useState("");
//     const [meetingId, setMeetingId] = useState("");
//     const [participantName, setParticipantName] = useState("");
//     const [micOn, setMicOn] = useState(false);
//     const [webcamOn, setWebcamOn] = useState(false);
//     const [customAudioStream, setCustomAudioStream] = useState(null);
//     const [customVideoStream, setCustomVideoStream] = useState(null)
//     const [isMeetingStarted, setMeetingStarted] = useState(false);
//     const [isMeetingLeft, setIsMeetingLeft] = useState(false);

//     const isMobile = window.matchMedia(
//         "only screen and (max-width: 768px)"
//     ).matches;

//     useEffect(() => {
//         if (isMobile) {
//             window.onbeforeunload = () => {
//                 return "Are you sure you want to exit?";
//             };
//         }
//     }, [isMobile]);

//     return (
//         <div style={{display:"flex"}}>
//             <div><Navbar/></div>
//             <div><MeetingAppProvider>
//                 {isMeetingStarted ? (

//                     <MeetingProvider
//                         config={{
//                             meetingId,
//                             micEnabled: micOn,
//                             webcamEnabled: webcamOn,
//                             name: participantName ? participantName : "TestUser",
//                             multiStream: true,
//                             customCameraVideoTrack: customVideoStream,
//                             customMicrophoneAudioTrack: customAudioStream
//                         }}
//                         token={token}
//                         reinitialiseMeetingOnConfigChange={true}
//                         joinWithoutUserInteraction={true}
//                     >
//                         <MeetingContainer
//                             onMeetingLeave={() => {
//                                 setToken("");
//                                 setMeetingId("");
//                                 setParticipantName("");
//                                 setWebcamOn(false);
//                                 setMicOn(false);
//                                 setMeetingStarted(false);
//                             }}
//                             setIsMeetingLeft={setIsMeetingLeft}
//                         />
//                     </MeetingProvider>

//                 ) : isMeetingLeft ? (
//                     <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
//                 ) : (

//                     <JoiningScreen
//                         participantName={participantName}
//                         setParticipantName={setParticipantName}
//                         setMeetingId={setMeetingId}
//                         setToken={setToken}
//                         micOn={micOn}
//                         setMicOn={setMicOn}
//                         webcamOn={webcamOn}
//                         setWebcamOn={setWebcamOn}
//                         customAudioStream={customAudioStream}
//                         setCustomAudioStream={setCustomAudioStream}
//                         customVideoStream={customVideoStream}
//                         setCustomVideoStream={setCustomVideoStream}
//                         onClickStartMeeting={() => {
//                             setMeetingStarted(true);
//                         }}
//                         startMeeting={isMeetingStarted}
//                         setIsMeetingLeft={setIsMeetingLeft}
//                     />
//                 )}
//             </MeetingAppProvider></div>
            
//         </div>
//     );
// }

// export default App;

// import { MeetingProvider } from "@videosdk.live/react-sdk";
// import { useEffect, useState } from "react";
// import { MeetingAppProvider } from "../MeetingAppContextDefSW";
// import { MeetingContainer } from "../meetingSW/MeetingContainer";
// import { LeaveScreen } from "../componentsSW/screens/LeaveScreen";
// import { JoiningScreen } from "../componentsSW/screens/JoiningScreen";
// import Navbar from "../components/NavbarAB";

// function App() {
//     const [token, setToken] = useState("");
//     const [meetingId, setMeetingId] = useState("");
//     const [participantName, setParticipantName] = useState("");
//     const [micOn, setMicOn] = useState(false);
//     const [webcamOn, setWebcamOn] = useState(false);
//     const [customAudioStream, setCustomAudioStream] = useState(null);
//     const [customVideoStream, setCustomVideoStream] = useState(null);
//     const [isMeetingStarted, setMeetingStarted] = useState(false);
//     const [isMeetingLeft, setIsMeetingLeft] = useState(false);

//     const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;

//     useEffect(() => {
//         if (isMobile) {
//             window.onbeforeunload = () => {
//                 return "Are you sure you want to exit?";
//             };
//         }
//     }, [isMobile]);

//     return (
//         <div
//             // style={{
//             //     display: "flex",
//             //     height: "100vh", // Full height
//             //     width: "100vw", // Full width
//             //     overflow: "hidden", // Prevent scrolling
//             // }}
//         >
//             {/* Navbar Section */}
//             {/* <div
//                 style={{
//                     width: "20%", // Adjust navbar width
//                     // backgroundColor: "#f8f9fa", // Light background color for navbar
//                     // borderRight: "1px solid #ddd", // Divider line
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     // justifyContent: "center",
//                     // padding: "10px",
//                     // boxSizing: "border-box",
//                 }}
//             >
//                 <Navbar />
//             </div> */}

//             {/* Meeting Section */}
//             <div
//                 style={{
//                     flex: 1, // Take up remaining space
//                     padding: "20px", // Add some padding
//                     boxSizing: "border-box",
//                     display: "flex",
//                     flexDirection: "column", // Stack content vertically
//                     // backgroundColor: "#ffffff", // Background for meeting area
//                 }}
//             >
//                 <MeetingAppProvider>
//                     {isMeetingStarted ? (
//                         <MeetingProvider
//                             config={{
//                                 meetingId,
//                                 micEnabled: micOn,
//                                 webcamEnabled: webcamOn,
//                                 name: participantName ? participantName : "TestUser",
//                                 multiStream: true,
//                                 customCameraVideoTrack: customVideoStream,
//                                 customMicrophoneAudioTrack: customAudioStream,
//                             }}
//                             token={token}
//                             reinitialiseMeetingOnConfigChange={true}
//                             joinWithoutUserInteraction={true}
//                         >
//                             <MeetingContainer
//                                 onMeetingLeave={() => {
//                                     setToken("");
//                                     setMeetingId("");
//                                     setParticipantName("");
//                                     setWebcamOn(false);
//                                     setMicOn(false);
//                                     setMeetingStarted(false);
//                                 }}
//                                 setIsMeetingLeft={setIsMeetingLeft}
//                             />
//                         </MeetingProvider>
//                     ) : isMeetingLeft ? (
//                         <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
//                     ) : (
//                         <JoiningScreen
//                             participantName={participantName}
//                             setParticipantName={setParticipantName}
//                             setMeetingId={setMeetingId}
//                             setToken={setToken}
//                             micOn={micOn}
//                             setMicOn={setMicOn}
//                             webcamOn={webcamOn}
//                             setWebcamOn={setWebcamOn}
//                             customAudioStream={customAudioStream}
//                             setCustomAudioStream={setCustomAudioStream}
//                             customVideoStream={customVideoStream}
//                             setCustomVideoStream={setCustomVideoStream}
//                             onClickStartMeeting={() => {
//                                 setMeetingStarted(true);
//                             }}
//                             startMeeting={isMeetingStarted}
//                             setIsMeetingLeft={setIsMeetingLeft}
//                         />
//                     )}
//                 </MeetingAppProvider>
//             </div>
//         </div>
//     );
// }

// export default App;
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { useEffect } from "react";
import { useState } from "react";
import { MeetingAppProvider } from "../MeetingAppContextDefSW";
import { MeetingContainer } from "../meetingSW/MeetingContainer";
import { LeaveScreen } from "../componentsSW/screens/LeaveScreen";
import { JoiningScreen } from "../componentsSW/screens/JoiningScreen"

function App() {
    const [token, setToken] = useState("");
    const [meetingId, setMeetingId] = useState("");
    const [participantName, setParticipantName] = useState("");
    const [micOn, setMicOn] = useState(false);
    const [webcamOn, setWebcamOn] = useState(false);
    const [customAudioStream, setCustomAudioStream] = useState(null);
    const [customVideoStream, setCustomVideoStream] = useState(null)
    const [isMeetingStarted, setMeetingStarted] = useState(false);
    const [isMeetingLeft, setIsMeetingLeft] = useState(false);

    const isMobile = window.matchMedia(
        "only screen and (max-width: 768px)"
    ).matches;

    useEffect(() => {
        if (isMobile) {
            window.onbeforeunload = () => {
                return "Are you sure you want to exit?";
            };
        }
    }, [isMobile]);

    return (
        <>
            <MeetingAppProvider>
                {isMeetingStarted ? (

                    <MeetingProvider
                        config={{
                            meetingId,
                            micEnabled: micOn,
                            webcamEnabled: webcamOn,
                            name: participantName ? participantName : "TestUser",
                            multiStream: true,
                            customCameraVideoTrack: customVideoStream,
                            customMicrophoneAudioTrack: customAudioStream
                        }}
                        token={token}
                        reinitialiseMeetingOnConfigChange={true}
                        joinWithoutUserInteraction={true}
                    >
                        <MeetingContainer
                            onMeetingLeave={() => {
                                setToken("");
                                setMeetingId("");
                                setParticipantName("");
                                setWebcamOn(false);
                                setMicOn(false);
                                setMeetingStarted(false);
                            }}
                            setIsMeetingLeft={setIsMeetingLeft}
                        />
                    </MeetingProvider>

                ) : isMeetingLeft ? (
                    <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
                ) : (

                    <JoiningScreen
                        participantName={participantName}
                        setParticipantName={setParticipantName}
                        setMeetingId={setMeetingId}
                        setToken={setToken}
                        micOn={micOn}
                        setMicOn={setMicOn}
                        webcamOn={webcamOn}
                        setWebcamOn={setWebcamOn}
                        customAudioStream={customAudioStream}
                        setCustomAudioStream={setCustomAudioStream}
                        customVideoStream={customVideoStream}
                        setCustomVideoStream={setCustomVideoStream}
                        onClickStartMeeting={() => {
                            setMeetingStarted(true);
                        }}
                        startMeeting={isMeetingStarted}
                        setIsMeetingLeft={setIsMeetingLeft}
                    />
                )}
            </MeetingAppProvider>
        </>
    );
}

export default App;