import { OrderItem } from "sequelize";

export const fromToOrdering = (from: string) => {
  let to: string = "";

  switch (from) {
    case "Título (A-Z)":
      to = "title.asc";
      break;
    case "Título (Z-A)":
      to = "title.desc";
      break;
    case "Popularidade":
      to = "popularity.desc";
      break;
    case "Data de Lançamento":
      to = "primary_release_date.desc";
      break;
    default:
      to = "popularity.desc";
  }

  return to;
};

export const fromToSequelizeOrder = (
  from: string
): { column: string; order: string } => {
  let to = { column: "id", order: "DESC" };

  switch (from) {
    case "Título (A-Z)":
      to = { column: "name", order: "ASC" };
      break;
    case "Título (Z-A)":
      to = { column: "name", order: "DESC" };
      break;
    case "Popularidade":
      to = { column: "popularity", order: "DESC" };
      break;
    case "Data de Lançamento":
      to = { column: "releaseDate", order: "DESC" };
      break;
    default:
      to = { column: "id", order: "DESC" };
  }

  return to;
};
