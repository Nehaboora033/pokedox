import React from "react";

const PokemonCard = ({ pokemons }) => {
  return (
    <div className="grid grid-cols-3">
      {pokemons.map(p => (
        <div
          key={p.id}
          className=" m-2.5 mt-20  p-4 pt-10 flex flex-col items-center justify-center relative shadow-lg rounded-2xl"
        >
          {/* ID */}
          <p className="text-[#8f9396]">N{p.id}</p>

          {/* Image */}
          {p.sprites && (
            <img
              src={p.sprites.front_default}
              alt={p.name}
              className="w-[140px] h-[140px] mb-2 absolute -top-20"
            />
          )}

          {/* Name */}
          <p className="m-1 text-[24px] font-bold capitalize">{p.name}</p>

          {/* Types */}
          <div className="flex gap-2 items-center justify-center text-center">
            {p.types.map(t => {
              return (
                <div
                  key={t.type.name}
                  className="text-[14px] p-1 bg-gray-200 rounded-md font-bold capitalize"  >
                  {t.type.name} 
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonCard;