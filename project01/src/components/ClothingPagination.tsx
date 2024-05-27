import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useLocation } from "react-router";

export function ClothingPagination({
  currentPage,
  maxPages,
}: {
  currentPage: number;
  maxPages: number;
}) {
  const location = useLocation();
  return (
    <Pagination className="mb-3">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`${location.pathname}?page=${currentPage - 1}`} />
          </PaginationItem>
        )}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink href={`${location.pathname}?page=1`}>1</PaginationLink>
          </PaginationItem>
        )}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={`${location.pathname}?page=${currentPage - 1}`}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {maxPages >= currentPage + 1 && (
          <>
            <PaginationItem>
              <PaginationLink href={`${location.pathname}?page=${currentPage + 1}`}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
            {maxPages > currentPage + 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext href={`${location.pathname}?page=${currentPage + 1}`} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
