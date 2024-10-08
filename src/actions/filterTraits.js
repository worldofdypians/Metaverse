const fs = require('fs');
const metadata = require('./cawsmetadatas2.json')



function searchNFTsByTraits(traits, jsonData) {
  const matchingTokenNames = Object.entries(jsonData).reduce((result, [tokenID, token]) => {
    const attributes = token.attributes;

    const matches = traits.every((trait) => {
      const traitType = trait.trait_type;
      const traitValues = trait.value;

      const attributeValues = attributes
        .filter((attribute) => attribute.trait_type === traitType)
        .map((attribute) => attribute.value.toString().toLowerCase());

      if (traitValues && traitValues.length === 1) {
        return attributeValues.includes(traitValues[0].toString().toLowerCase());
      } else if (traitValues && traitValues.length > 1) {
        return traitValues.some((value) => attributeValues.includes(value.toString().toLowerCase()));
      }
      
      return true;
    });

    if (matches) {
      result.push(token.name);
    }
    return result;
  }, []);

  return matchingTokenNames;
}



export {searchNFTsByTraits}