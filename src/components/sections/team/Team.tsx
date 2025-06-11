import { useQuery } from '@tanstack/react-query';
import fetch from '../../../services/api.ts';
import OptimizedImage from '../../ui/OptimizedImage.tsx';

const Team = () => {
  const { data } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const response = await fetch({
        url: `team?_embed&acf_format=standard`,
        method: 'GET'
      });
      return (response.data as any[]).map(
        (item) =>
          ({
            id: item.id,
            name: item.acf.name,
            image: item.acf.image,
            role: item.acf.role,
            description: item.acf.description
          }) as TeamMember
      );
    }
  });

  return (
    <div className="bg-black py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-yellow-400 text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
          MEET THE TEAM:
        </h2>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {data?.map((member) => (
            <div key={member.name} className="flex flex-col items-center">
              {/* Profile Image */}
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden mb-3 md:mb-4">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>

              {/* Name */}
              <h3 className="text-yellow-400 text-lg md:text-xl font-bold text-center">
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-gray-400 text-xs md:text-sm text-center mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
      <OptimizedImage
        src="https://theundergroundbasement.com/wordpress/wp-content/uploads/2025/04/IMG_0833-scaled.webp"
        alt="Underground Basement Logo"
        priority={true}
        className="max-w-full h-auto mt-32"
      />
    </div>
  );
};

export default Team;
