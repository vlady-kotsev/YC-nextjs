import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =
  defineQuery(`*[ _type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search  || author->name match $search] | order(_createdAt desc){
    _id,
    title,
    slug, 
    author -> {_id, name, bio, image},
    views,
    category,
    image,
    description,
  }
`);

export const STARTUP_BY_ID = defineQuery(
  `
    *[ _type == "startup" && _id == $id] [0]{
    _id,
    title,
    slug,
    _createdAt,
    author -> {_id, name, bio, image, username},
    views,
    category,
    image,
    description,
    pitch
  }
  `
);

export const STARTUP_VIEWS = defineQuery(
  `
  *[ _type == "startup" && _id == $id ][0]{
    _id, views
  }
  `
);

export const AUTHOR_BY_GITHUB_ID = defineQuery(
  `
  *[ _type =="author" && id == $id][0]{
  id,
  _id,
  name,
  username,
  email,
  image,
  bio,
  }`
);
