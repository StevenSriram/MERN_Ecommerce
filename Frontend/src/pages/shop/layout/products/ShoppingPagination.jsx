import { useSelector, useDispatch } from "react-redux";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { setPage } from "@/store/slices/shopSlice";

const ShoppingPagination = () => {
  const { totalProducts, limit, page } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const totalPages = Math.ceil(totalProducts / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem
            key={index + 1}
            className={`${
              index + 1 === page &&
              "bg-gray-900 text-white transition duration-200"
            } rounded-lg `}
          >
            <PaginationLink onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={() => handlePageChange(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ShoppingPagination;
