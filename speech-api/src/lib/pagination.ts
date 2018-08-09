import { Repository } from "typeorm";

export async function page(repository: Repository<any>, pageIndex: number, options = {}) {
  const perPage = parseInt(process.env.PER_PAGE, 10);
  pageIndex = Math.max(~~pageIndex, 1);
  options = {...options, ...{
    skip: (pageIndex - 1) * perPage,
    take: perPage
  }};

  const [data, total] = await repository.findAndCount(options);
  return {
    data,
    total,
    perPage: perPage,
    lastPage: Math.ceil(total / perPage)
  };
}