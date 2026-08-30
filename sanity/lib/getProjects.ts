import { client } from './client'
import { projectId } from '../env'
import { projects as localProjects, Project } from '@/data/projects'

export const getProjects = async (): Promise<Project[]> => {
  if (!projectId || projectId === '') {
    console.log("No Sanity Project ID found. Falling back to local data.");
    return localProjects;
  }

  try {
    const query = `*[_type == "project"] | order(featured desc, _createdAt desc) {
      _id,
      title,
      "id": slug.current,
      category,
      "image": select(
        coverType == 'video' => coverVideoFile.asset->url,
        coverType == 'image' => coverImage.asset->url
      ),
      aspect,
      description,
      "gallery": gallery[].asset->url,
      roles,
      technicalDetails,
      featured
    }`;
    const sanityProjects = await client.fetch(query);
    
    if (sanityProjects && sanityProjects.length > 0) {
      const formattedSanityProjects = sanityProjects.map((p: any) => ({
        id: p.id || p._id, // Use string slug as ID or fallback to _id
        title: p.title,
        category: p.category,
        image: p.image || '',
        aspect: p.aspect || 'aspect-square',
        description: p.description || '',
        gallery: p.gallery || [],
        roles: p.roles || [],
        technicalDetails: p.technicalDetails || [],
        featured: p.featured || false,
      })) as Project[];

      // Merge: Keep static projects that don't have a matching title in Sanity, 
      // and add all Sanity projects. This allows gradual migration.
      const sanityTitles = formattedSanityProjects.map(p => p.title.toLowerCase());
      const filteredLocal = localProjects.filter(p => !sanityTitles.includes(p.title.toLowerCase()));
      
      return [...formattedSanityProjects, ...filteredLocal];
    }
  } catch (error) {
    console.error("Error fetching projects from Sanity, falling back to local data:", error);
  }

  return localProjects;
}
