# vCard-To-CSV-nodejs

I need to convert vCards into CSV on a regular basis. Therefore I need a script (Node JS 8.10) to perform the following:
- Parse vCard files (vcf V3.0/V4.0) for contacts. Files can contain multiple contacts.
- Obey to a mapping from vCard fields to CSV fields (must be customizable)
- Create a CSV with fields from a mapping table

Special things to consider:
- vCard files contain custom values (e.g. X-SocialProfile)
- CSV file has defined structure. Not all fields are provided by each vCard. The CSV has to be filled with all fields from the mapping in the same order
- The mapping has to be configurable later on
- Currently, vCards are in V3.0 but it is planned to upgrade to vCard V4.0, so both versions have to be possible
- I can provide sample vCards and CSV structure

# Challenge Accepted
