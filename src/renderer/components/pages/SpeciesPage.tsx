import { PageFC } from "@renderer/interfaces/components/PageFC";
import { useState } from "react";
import { Type1Combobox } from "../form/field/comboboxes/typeComboboxes/Type1Combobox";
import { Type2Combobox } from "../form/field/comboboxes/typeComboboxes/Type2Combobox";
import { TextInput } from "../form/field/inputs/TextInput";
import { GenerationInput } from "../form/field/inputs/numberInputs/GenerationInput";
import { DexNoInput } from "../form/field/inputs/numberInputs/DexNoInput";
import { CreateSpeciesButton } from "../form/buttons/species/CreateSpeciesButton";
import { SpeciesTable } from "../tables/SpeciesTable";




export const SpeciesPage: PageFC = () => {

  // input state
  const [generation, setGeneration] = useState<number | null>(null);
  const [dexNo, setDexNo] = useState<number | null>(null);
  const [type1Id, setType1Id] = useState<string | null>(null);
  const [type2Id, setType2Id] = useState<string | null>(null);
  const [newSpeciesName, setNewSpeciesName] = useState<string | null>(null);
  const [newSpeciesForm, setNewSpeciesForm] = useState<string | null>(null);


  return (
    <div className="w-full h-full flex flex-col gap-2">

      {/** Above Table */}
      <div>


        {/** Inputs */}
        <div className="flex flex-col w-52 overflow-auto gap-2">

          {/** Inputs */}
          <div className="flex flex-row gap-2">
            <GenerationInput generation={generation} onChange={setGeneration} label />
            <DexNoInput dexNo={dexNo} onChange={setDexNo} label />
          </div>


          {/** Types */}
          <div className="flex flex-row gap-2">
            <Type1Combobox label type1Id={type1Id} onChange={setType1Id} />
            <Type2Combobox label type2Id={type2Id} onChange={setType2Id} />
          </div>

          {/** Name and Form */}
          <TextInput
            label="Name"
            value={newSpeciesName}
            onChange={setNewSpeciesName}
            invalid={newSpeciesName === null}
          />
          <TextInput
            label="Form"
            value={newSpeciesForm}
            onChange={setNewSpeciesForm}
          />

          {/** Create Button */}
          {(generation && dexNo && type1Id && newSpeciesName) && <CreateSpeciesButton
            generation={generation}
            dexNo={dexNo}
            type1Id={type1Id}
            type2Id={type2Id}
            name={newSpeciesName}
            form={newSpeciesForm}
            onSuccess={() => {
              setDexNo(null);
              setType1Id(null);
              setType2Id(null);
              setNewSpeciesName(null);
              setNewSpeciesForm(null);
            }}
          />}
        </div>
      </div>



      {/** Species Table */}
      <div className="flex-1 overflow-hidden">
        <SpeciesTable />
      </div>

    </div>
  )
};