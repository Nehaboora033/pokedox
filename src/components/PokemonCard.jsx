import React from "react";
import { typeColors } from "../utils/helper";


const PokemonCard = ({ pokemons, onSelect }) => {
  return (
    <div className="grid md:grid-cols-3 min-[450px]:grid-cols-2  ">
      {pokemons.map(p => (
        <div
          key={p.id}
          onClick={() => onSelect(p)}
          className=" m-2.5 mt-20 hover:outline outline-gray-300 hover:scale-[0.99] group transition-all duration-150 ease-in-out cursor-pointer  p-4 pt-10 flex flex-col items-center bg-white justify-center relative shadow-lg rounded-2xl"
        >
          {/* ID */}
          <p className="text-[#8f9396] ">N°{p.id}</p>

          {/* Image */}
          {p.sprites && (
            <img
              src={p.sprites.front_default}
              alt={p.name}
              className="w-[110px] h-[120px] absolute -top-17 group-hover:scale-[1.1]"
            />
          )}

          {/* Name */}
          <p className="m-1 text-[24px] font-bold capitalize">{p.name}</p>

          {/* Types */}
          <div className="flex gap-2 items-center justify-center text-center ">
            {p.types.map(t => {
              return (
                <div
                  key={t.type.name}
                  style={{ backgroundColor: typeColors[t.type.name] }}
                  className="text-[14px] px-2 py-1 rounded-md font-bold capitalize " >
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