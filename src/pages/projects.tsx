import * as React from "react";
import { PageProps, graphql } from "gatsby";
import { Projects, Seo } from "./../components";
import { IGatsbyImageData } from "gatsby-plugin-image";

type TypeAllProjectsQuery = {
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
        id: string;
        gatsbyImageData: IGatsbyImageData;
      };
      images_list: Array<{
        gatsbyImageData: IGatsbyImageData;
        id: string;
      }>;
    }>;
  };
};

export const query = graphql`
  query AllProjects {
    allContentfulPortfolioProjects {
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
          id
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
        }
        technologies
        images_list {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          id
        }
      }
    }
  }
`;

export default function ProjectsPage({
  data,
}: PageProps<TypeAllProjectsQuery>) {
  const projects = data.allContentfulPortfolioProjects.nodes;
  return (
    <main>
      <section className="projects-page">
        <Projects title="all projects" projects={projects} />
      </section>
    </main>
  );
}

export const Head = () => <Seo title={"Projects"} image="/all-projects.png" />;
