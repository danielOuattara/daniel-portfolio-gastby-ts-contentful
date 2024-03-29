import * as React from "react";
import { type PageProps, graphql } from "gatsby";
import { Hero, Services, Projects, Seo } from "../components";

export const query = graphql`
  query FeaturedProjects {
    allContentfulPortfolioProjects(filter: { featured: { eq: true } }) {
      totalCount
      nodes {
        id
        title
        category
        level
        description {
          description
        }
        url_website
        url_github
        featured
        featured_image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
        }
        technologies
      }
    }
  }
`;

type TypeFeaturedProjectsQuery = {
  allContentfulPortfolioProjects: {
    totalCount: number;
    nodes: Array<{
      id: string;
      title: string;
      category: string;
      level: string;
      url_website: string;
      url_github: string;
      featured: boolean;
      technologies: Array<string>;
      description: { description: string };
      featured_image: {
        gatsbyImageData: import("gatsby-plugin-image").IGatsbyImageData;
      };
    }>;
  };
};

export default function HomePage({
  data,
}: PageProps<TypeFeaturedProjectsQuery>) {
  const featuredProjects = data.allContentfulPortfolioProjects.nodes;
  return (
    <main>
      <Hero />
      <Services />
      <Projects
        title="featured projects"
        showLinkToProjects={true}
        projects={featuredProjects}
      />
    </main>
  );
}

export const Head = () => <Seo title={"Home"} image="/home.png" />;
