//   "use client";

//   import { AspectRatio } from "@radix-ui/react-aspect-ratio";
//   import { useRef, useState } from "react";
//   import { Rnd } from "react-rnd";

//   const SinglePage = ({ caseType }) => {
//     const [rnd, setRnd] = useState({
//       x: 150,
//       y: 205,
//       width: "250px",
//       height: "300px",
//     });

//     const [isBlurred, setIsBlurred] = useState(false); 

//     const phoneCaseRef = useRef(null);
//     const containerRef = useRef(null);


//     const setPosition = (e, direction) => {
//       setRnd((prevRnd) => {
//         const newRnd = { ...prevRnd, x: direction.x, y: direction.y };
//         updateBlurState(newRnd);
//         return newRnd;
//       });
//     };



//     // const updateBlurState = (newRnd) => {
//     //   if (phoneCaseRef.current && containerRef.current) {
//     //     // Phone case bounding box
//     //     const phoneCaseBounds = phoneCaseRef.current.getBoundingClientRect();

//     //     // RND absolute bounds
//     //     const containerBounds = containerRef.current.getBoundingClientRect();
//     //     const absoluteX = containerBounds.left + newRnd.x;
//     //     const absoluteY = containerBounds.top + newRnd.y;

//     //     // Parse dimensions to integers
//     //     const width = parseInt(newRnd.width, 10);
//     //     const height = parseInt(newRnd.height, 10);

//     //     // Calculate Rnd boundaries
//     //     const rndLeft = absoluteX;
//     //     const rndTop = absoluteY;
//     //     const rndRight = rndLeft + width;
//     //     const rndBottom = rndTop + height;

//     //     const isFullyWithinBounds =
//     //       rndLeft >= phoneCaseBounds.left &&
//     //       rndRight <= phoneCaseBounds.right &&
//     //       rndTop >= phoneCaseBounds.top &&
//     //       rndBottom <= phoneCaseBounds.bottom;

//     //     console.log("Phone Case Bounds:", phoneCaseBounds);
//     //     console.log("Rnd Bounds:", { rndLeft, rndTop, rndRight, rndBottom });
//     //     console.log("Is Fully Within Bounds:", isFullyWithinBounds);

//     //     setIsBlurred(!isFullyWithinBounds);
//     //   }
//     // };

// const updateBlurState = (newRnd) => {
//   if (phoneCaseRef.current && containerRef.current) {
//     // Phone case bounding box
//     const phoneCaseBounds = phoneCaseRef.current.getBoundingClientRect();

//     // RND absolute bounds
//     const containerBounds = containerRef.current.getBoundingClientRect();

//     // Calculate absolute X and Y based on the container
//     const absoluteX = newRnd.x + containerBounds.left;
//     const absoluteY = newRnd.y + containerBounds.top;

//     // Parse dimensions to integers
//     const width = parseInt(newRnd.width, 10);
//     const height = parseInt(newRnd.height, 10);

//     // Calculate Rnd boundaries
//     const rndLeft = absoluteX;
//     const rndTop = absoluteY;
//     const rndRight = rndLeft + width;
//     const rndBottom = rndTop + height;

//     // Check if the Rnd is fully within the phone case bounds
//     const isFullyWithinBounds =
//       rndLeft <= phoneCaseBounds.left &&
//       rndRight >= phoneCaseBounds.right &&
//       rndTop <= phoneCaseBounds.top &&
//       rndBottom >= phoneCaseBounds.bottom;
//       console.log("----------", rndBottom >= phoneCaseBounds.bottom )

//     console.log("Phone Case Bounds:", phoneCaseBounds);
//     console.log("Rnd Bounds:", { rndLeft, rndTop, rndRight, rndBottom });
//     console.log("Is Fully Within Bounds:", isFullyWithinBounds);

//     setIsBlurred(!isFullyWithinBounds);
//   }
// };

//     const setSize = (e, direction, ref, delta, position) => {
//       setRnd((prevRnd) => {
//         const newRnd = {
//           ...prevRnd,
//           width: parseInt(ref.style.width, 10), // Convert width to integer
//           height: parseInt(ref.style.height, 10), // Convert height to integer
//           x: position.x,
//           y: position.y,
//         };
//         updateBlurState(newRnd);
//         return newRnd;
//       });
//     };



//     const saveConfiguration = async () => {
//       try {
//         const {
//           left: caseLeft,
//           top: caseTop,
//           width,
//           height,
//         } = phoneCaseRef.current.getBoundingClientRect();

//         const { left: containerLeft, top: containerTop } =
//           containerRef.current.getBoundingClientRect();

//         const leftOffset = caseLeft - containerLeft;
//         const topOffset = caseTop - containerTop;

//         const actualX = rnd.x - leftOffset;
//         const actualY = rnd.y - topOffset;

//         // Create the canvas
//         const canvas = document.createElement("canvas");
//         canvas.width = width; // Set the canvas to the phone case width
//         canvas.height = height; // Set the canvas to the phone case height
//         const ctx = canvas.getContext("2d");

//         // Load the user image
//         const userImage = new Image();
//         userImage.crossOrigin = "anonymous";
//         userImage.src =
//           "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
//         // userImage.src =
//         //   "https://d1lss44hh2trtw.cloudfront.net/assets/editorial/2020/08/tree-no-blur-grounded.JPG";

//         await new Promise((resolve, reject) => {
//           userImage.onload = resolve;
//           userImage.onerror = reject;
//         });

//         // Scale and draw the user image (clipped to the phone case dimensions)
//         ctx.drawImage(
//           userImage,
//           actualX, // X-coordinate within the canvas
//           actualY, // Y-coordinate within the canvas
//           rnd.width, // Width of the user image in the canvas
//           rnd.height // Height of the user image in the canvas
//         );


//         const phoneCaseImage = new Image();
//         phoneCaseImage.crossOrigin = "anonymous";
//         phoneCaseImage.src = caseType.image;

//         await new Promise((resolve, reject) => {
//           phoneCaseImage.onload = resolve;
//           phoneCaseImage.onerror = reject;
//         });

//         // Draw the phone case image on top
//         ctx.drawImage(phoneCaseImage, 0, 0, width, height);


//         // Convert the canvas content to a Blob
//         const blob = await new Promise((resolve) =>
//           canvas.toBlob(resolve, "image/png")
//         );

//         if (blob) {
//           const formData = new FormData();
//           formData.append("image", blob);

//           try {
//             const response = await fetch(
//               "https://api.imgbb.com/1/upload?key=686f1c4660e2ad9ff84cdc1e16d79db3",
//               {
//                 method: "POST",
//                 body: formData,
//               }
//             );

//             if (!response.ok) {
//               throw new Error("Failed to upload image");
//             }

//             const data = await response.json();
//             const imageUrl = data.data.url;

//             console.log("Uploaded Image URL:", imageUrl);
//           } catch (uploadError) {
//             console.error("Error uploading image:", uploadError);
//           }
//         }
//       } catch (error) {
//         console.error("An error occurred:", error);
//       }
//     };

//     return (
//       <>
//         <div className="relative mt-20 grid grid-cols-3">
//           <div
//             ref={containerRef}
//             className="relative h-[40.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
//           >
//             <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831] border-4 border-blue-800">
//               <AspectRatio
//                 ref={phoneCaseRef}
//                 ratio={896 / 1831}
//                 className="pointer-events-none relative z-50 aspect-[896/1831] w-full rounded-lg"
//               >
//                 <img
//                   fill  
//                   src={caseType.image}
//                   alt={caseType.type}
//                   className="pointer-events-none z-50 select-none"
//                 />
//               </AspectRatio>
//             </div>
// <Rnd
//   size={{ width: rnd.width, height: rnd.height }}
//   position={{ x: rnd.x, y: rnd.y }}
//   onDragStart={() => setIsBlurred(true)} 
//   onDragStop={(e, data) => {
//     setIsBlurred(false); 
//     setPosition(e, data);
//   }}
//   onResizeStop={setSize}
// >
//   <div
//     className={`relative w-full h-full transition duration-200 ease-in-out ${
//       isBlurred ? "bg-blue-500 bg-opacity-50" : ""
//     }`}
//   >
//     <img
//       fill
//       // src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//       src="https://d1lss44hh2trtw.cloudfront.net/assets/editorial/2020/08/tree-no-blur-grounded.JPG"
//       alt="your image"
//       className={`pointer-events-none border-4 border-red-600 w-full h-full ${
//         isBlurred ? "blur-sm" : ""
//       }`}
//     />
//   </div>
// </Rnd>

//             {/* <Rnd
//               size={{ width: rnd.width, height: rnd.height }}
//               position={{ x: rnd.x, y: rnd.y }}
//               onDragStart={}
//               onDragStop={setPosition}
//               onResizeStop={setSize}
//             >
//               <div className="relative w-full h-full">
//                 <img
//                   fill
//                   src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//                   alt="your image"
//                   className={`pointer-events-none border border-red-600 w-full h-full ${isBlurred ? "blur-sm" : ""
//                     }`}
//                 />
//               </div>
//             </Rnd> */}
//           </div>

//         </div>
//         <button
//           onClick={saveConfiguration}
//           className="mt-4 p-2 bg-blue-500 text-white rounded"
//         >
//           Save Image
//         </button>
//       </>
//     );
//   };

//   export default SinglePage;


"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useRef, useState } from "react";
import { Rnd } from "react-rnd";

const SinglePage = ({ caseType }) => {
  const [rnd, setRnd] = useState({
    x: 150,
    y: 205,
    width: 250, // Use numbers instead of strings for easier calculations
    height: 300,
  });

  const phoneCaseRef = useRef(null);
  const containerRef = useRef(null);

  const setPosition = (e, data) => {
    setRnd((prevRnd) => ({
      ...prevRnd,
      x: data.x,
      y: data.y,
    }));
  };

  const setSize = (e, direction, ref, delta, position) => {
    setRnd((prevRnd) => ({
      ...prevRnd,
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
      x: position.x,
      y: position.y,
    }));
  };

  // const saveConfiguration = async () => {
  //   try {
  //     const {
  //       left: caseLeft,
  //       top: caseTop,
  //       width,
  //       height,
  //     } = phoneCaseRef.current.getBoundingClientRect();

  //     const { left: containerLeft, top: containerTop } =
  //       containerRef.current.getBoundingClientRect();

  //     const leftOffset = caseLeft - containerLeft;
  //     const topOffset = caseTop - containerTop;

  //     const actualX = rnd.x - leftOffset;
  //     const actualY = rnd.y - topOffset;

  //     // Create the canvas
  //     const canvas = document.createElement("canvas");
  //     canvas.width = width;
  //     canvas.height = height;
  //     const ctx = canvas.getContext("2d");

  //     // Load the user image
  //     const userImage = new Image();
  //     userImage.crossOrigin = "anonymous";
  //     userImage.src =
  //       "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  //     await new Promise((resolve, reject) => {
  //       userImage.onload = resolve;
  //       userImage.onerror = reject;
  //     });

  //     // Draw the user image on the canvas
  //     ctx.drawImage(userImage, actualX, actualY, rnd.width, rnd.height);

  //     // Load the phone case image
  //     const phoneCaseImage = new Image();
  //     phoneCaseImage.crossOrigin = "anonymous";
  //     phoneCaseImage.src = caseType.image;

  //     await new Promise((resolve, reject) => {
  //       phoneCaseImage.onload = resolve;
  //       phoneCaseImage.onerror = reject;
  //     });

  //     // Draw the phone case image on top
  //     ctx.drawImage(phoneCaseImage, 0, 0, width, height);

  //     // Convert the canvas content to a Blob
  //     const blob = await new Promise((resolve) =>
  //       canvas.toBlob(resolve, "image/png")
  //     );

  //     if (blob) {
  //       const formData = new FormData();
  //       formData.append("image", blob);

  //       try {
  //         console.log(formData)
  //         const response = await fetch(
  //           "https://api.imgbb.com/1/upload?key=686f1c4660e2ad9ff84cdc1e16d79db3",
  //           {
  //             method: "POST",
  //             body: formData,
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error("Failed to upload image");
  //         }

  //         const data = await response.json();
  //         const imageUrl = data.data.url;

  //         console.log("Uploaded Image URL:", imageUrl);
  //       } catch (uploadError) {
  //         console.error("Error uploading image:", uploadError);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };

  const saveConfiguration = async () => {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current.getBoundingClientRect();

      const { left: containerLeft, top: containerTop } =
        containerRef.current.getBoundingClientRect();

      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const renderedPosition = { x: rnd.x, y: rnd.y };
      const renderedDimension = { width: rnd.width, height: rnd.height };

      const actualX = renderedPosition.x - leftOffset;
      const actualY = renderedPosition.y - topOffset;

      // Create the canvas
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      // Load the user image
      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src =
        "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

      await new Promise((resolve, reject) => {
        userImage.onload = resolve;
        userImage.onerror = reject;
      });

      // Draw the user image on the canvas
      ctx.drawImage(userImage, actualX, actualY, renderedDimension.width, renderedDimension.height);

      // Load the phone case image
      const phoneCaseImage = new Image();
      phoneCaseImage.crossOrigin = "anonymous";
      phoneCaseImage.src = caseType.image;

      await new Promise((resolve, reject) => {
        phoneCaseImage.onload = resolve;
        phoneCaseImage.onerror = reject;
      });

      // Draw the phone case image on top
      ctx.drawImage(phoneCaseImage, 0, 0, width, height);

      // Convert the canvas content to a base64 string
      const base64 = canvas.toDataURL("image/png");
      const base64Data = base64.split(",")[1];

      // Convert base64 to Blob
      const blob = base64ToBlob(base64Data, "image/png");

      // Create a File object
      const file = new File([blob], "filename.png", { type: "image/png" });

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("image", file);

      // Upload the file to imgbb
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=686f1c4660e2ad9ff84cdc1e16d79db3",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      const imageUrl = data.data.url;

      console.log("Uploaded Image URL:", imageUrl);
    } catch (err) {
      console.error("An error occurred:", err);
      toast({
        title: "Something went wrong",
        description: "There was a problem saving your config, please try again.",
        variant: "destructive",
      });
    }
  };

  // Helper function to convert base64 to Blob
  function base64ToBlob(base64, mimeType) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  return (
    <>
      <div className="relative mt-20 grid grid-cols-3">
        <div
          ref={containerRef}
          className="relative h-[40.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
            <AspectRatio
              ref={phoneCaseRef}
              ratio={896 / 1831}
              className="pointer-events-none relative z-50 aspect-[896/1831] w-full rounded-lg"
            >
              <img
                fill
                src={caseType.image}
                alt={caseType.type}
                className="pointer-events-none z-50 select-none"
              />
            </AspectRatio>
            <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
          </div>

          <Rnd
            size={{ width: rnd.width, height: rnd.height }}
            position={{ x: rnd.x, y: rnd.y }}
            onDragStop={setPosition}
            onResizeStop={setSize}
          >
            <div className="relative w-full h-full">
              <img
                fill
                src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="your image"
                className="pointer-events-none w-full h-full"
              />
            </div>
          </Rnd>
        </div>
      </div>
      <button
        onClick={saveConfiguration}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Save Image
      </button>
    </>
  );
};

export default SinglePage;