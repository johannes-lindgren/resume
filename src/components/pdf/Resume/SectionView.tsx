import React, {FunctionComponent} from "react";
import {DetailsSection, EmploymentHistorySection, Section} from "@/model/resume";
import {StyleSheet, Text, View} from "@react-pdf/renderer";
import {theme} from "@/design/Theme";
import {Style} from "@react-pdf/types";
import {joinStyles} from "@/utils/joinStyles";
import {EmploymentView} from "@/components/pdf/Resume/EmploymentView";
import {Stack} from "@/components/pdf/Stack";
import {SkillSectionView} from "@/components/pdf/Resume/SkillSectionView";

const styles = StyleSheet.create({
  header: {
    ...theme.typography.header2,
  },
  description: {
    ...theme.typography.body,
  },
});

export const SectionView: FunctionComponent<{
  section: Section
  style?: Style | Style[] | undefined,
}> = (props) => {
  const {section, ...p} = props
  switch (section.type) {
    case "skills":
      return <SkillSectionView section={section} {...p} />
    case "details":
      return <DetailsSectionView section={section} {...p} />
    case "employmentHistory":
      return <EmploymentHistorySectionView section={section} {...p} />
  }
}

export const DetailsSectionView: FunctionComponent<{
  section: DetailsSection
  style?: Style | Style[] | undefined,
}> = (props) => (
  <Stack style={props.style} gap={2}>
    <Text style={{...theme.typography.header2}}>
      {props.section.header}
    </Text>
    <Text>
      {props.section.description}
    </Text>
  </Stack>
)

export const EmploymentHistorySectionView: FunctionComponent<{
  section: EmploymentHistorySection
  style?: Style | Style[] | undefined,
}> = (props) => (
  <Stack style={props.style} gap={3}>
    <Text style={{...theme.typography.header2}}>
      {props.section.header}
    </Text>
    {props.section.employments.map((employment, index) => (
      <EmploymentView
        key={index}
        emloyment={employment}
      />
    ))}
  </Stack>
)

