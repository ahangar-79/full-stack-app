// import { describe } from "node:test";
import SearchForm from "../../components/ui/SearchForm";
// import { startTurbopackTraceServer } from "next/dist/build/swc/generated-native";
import StartupCard from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts =[{
    _createAt: new Date(),
    views: 55,
    author: { _id: 1, name:'adrian'},
    _id: 1,
    description: 'This is description',
    // image: 'https://placehold.co/600*400',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_7QZevMIc8mNU6wYV8O1xBgcNHlHDvNGh2A&s',
    // image: 'https://espacio.fundaciontelefonica.com/audioguias/en/wp-content/uploads/sites/2/2018/10/NOSOTROS-ROBOTS.jpg',
    category: 'Robots',
    title: 'We robots'
  }]

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for "${query}"` : "All Startup"}
        </p>

        <ul className="mt-7 card_grid">
          {posts ?.length > 0 ? (posts.map((post) =>(
            <StartupCard key={post?._id} post={post}/>
          ))) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
