import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
import { SiNintendo } from "react-icons/si";

import { Platform } from "./GameTypes";

interface PlatformProps {
  platforms: {
    platform: Platform;
  }[];
}

const PlatformIcons: React.FC<PlatformProps> = ({ platforms }) => {
  const getPlatformIcon = (platformName: string): JSX.Element => {
    const name = platformName.toLowerCase();
    switch (name) {
      case "windows":
        return <FaWindows />;
      case "playstation":
        return <FaPlaystation />;
      case "xbox":
        return <FaXbox />;
      case "apple":
        return <FaApple />;
      case "linux":
        return <FaLinux />;
      case "android":
        return <FaAndroid />;
      case "ios":
        return <MdPhoneIphone />;
      case "web":
        return <BsGlobe />;
      case "nintendo":
        return <SiNintendo />;
      default:
        return <BsGlobe />;
    }
  };
  return (
    <Flex>
      {platforms.map(({ platform }) => (
        <Box key={platform.id} p="1">
          {getPlatformIcon(platform.name)}
        </Box>
      ))}
    </Flex>
  );
};

export default PlatformIcons;
