import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function UserVideoChatApp() {
      const roomID = getUrlParams().get('roomID') || randomID(5);
      let myMeeting = async (element) => {
     // generate Kit Token
     // const appID = 1365086290;
     // const serverSecret = "cbf6d40fcfcc143351fe4706ad17e5bc";
      const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
      const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET;
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));


     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          // mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
      });


  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}