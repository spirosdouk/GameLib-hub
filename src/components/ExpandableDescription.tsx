import React, { useState } from "react";
import { Box, Button, useColorModeValue } from "@chakra-ui/react";

interface ExpandableDescriptionProps {
  description: string;
}

const ExpandableDescription: React.FC<ExpandableDescriptionProps> = ({
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandButtonColor = useColorModeValue("yellow.400", "yellow.600");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const extractFirstParagraph = (description: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(description, "text/html");
    return doc.querySelector("p")?.outerHTML || "";
  };

  const firstParagraph = extractFirstParagraph(description);

  return (
    <Box>
      <Box
        dangerouslySetInnerHTML={{
          __html: isExpanded ? description : firstParagraph,
        }}
        sx={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: isExpanded ? "none" : 3,
          textOverflow: "ellipsis",
        }}
      />
      <Button
        size="sm"
        onClick={toggleExpand}
        colorScheme="yellow"
        mt="2"
        bg={expandButtonColor}
      >
        {isExpanded ? "Show Less" : "Read More"}
      </Button>
    </Box>
  );
};

export default ExpandableDescription;
