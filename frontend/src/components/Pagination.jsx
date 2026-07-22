import { Button, Flex, Text } from "@chakra-ui/react";
function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <Flex gap={2} justify="center" mt={6}>
      <Button size="sm" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Prev
      </Button>
      <Text alignSelf="center">{currentPage} / {totalPages}</Text>
      <Button size="sm" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </Button>
    </Flex>
  );
}

export default Pagination;